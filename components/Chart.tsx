import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { createChart, ColorType, MouseEventParams } from 'lightweight-charts';
import { createAssetTimeSeriesURL, getCurrentDate, parseTimeSeriesParamsAsString } from '@/util/timeSeries';
import { useAssetFetch } from '@/util/useAssetFetch';
import ErrorText from './ErrorText';
import Loader from './Loader';

function createToolTipElement() {
  // Create and style the tooltip html element
  const toolTip = document.createElement('div');
  toolTip.style.width = '96px';
  toolTip.style.height = '80px';
  toolTip.style.position = 'absolute';
  toolTip.style.display = 'none';
  toolTip.style.padding = '8px';
  toolTip.style.boxSizing = 'border-box';
  toolTip.style.fontSize = '12px';
  toolTip.style.textAlign = 'left';
  toolTip.style.zIndex = '1000';
  toolTip.style.top = '12px';
  toolTip.style.left = '12px';
  toolTip.style.pointerEvents = 'none';
  toolTip.style.border = '1px solid';
  toolTip.style.borderRadius = '2px';
  toolTip.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif';
  toolTip.style.background = 'white';
  toolTip.style.color = 'black';
  toolTip.style.borderColor = '#2962FF';
  return toolTip;
}

type ChartData = {
  time: string;
  value: number;
};

export const ChartComponent = ({ data }: { data: ChartData[] }) => {
  const chartContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const bgColor = 'transparent';
    const lineColor = '#2962FF';
    const textColor = 'white';
    const areaTopColor = '#2962FF';
    const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: bgColor },
        textColor,
      },
      height: 400,
    });

    chart.applyOptions({
      crosshair: {
        vertLine: {
          labelVisible: false,
        },
        horzLine: {
          labelVisible: false,
        },
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });

    const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
    newSeries.setData(data);

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 0;

    const toolTip = createToolTipElement();
    chartContainerRef.current.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove(({ time, point, seriesData }: MouseEventParams) => {
      if (
        point === undefined ||
        !time ||
        point.x < 0 ||
        point.x > chartContainerRef.current.clientWidth ||
        point.y < 0 ||
        point.y > chartContainerRef.current.clientHeight
      ) {
        toolTip.style.display = 'none';
      } else {
        toolTip.style.display = 'block';
        const data = seriesData.entries().next().value;
        const price = data[1].value;
        toolTip.innerHTML = `
          <div style="color: ${'#2962FF'}">Apple Inc.</div>
          <div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">${price}</div>
          <div style="color: ${'black'}">hi</div>
        `;

        const coordinate = newSeries.priceToCoordinate(price);
        console.log('coordinate', coordinate);
        let shiftedCoordinate = point.x - 50;
        if (coordinate === null) {
          return;
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(chartContainerRef.current.clientWidth - toolTipWidth, shiftedCoordinate),
        );

        const coordinateY =
          coordinate - toolTipHeight - toolTipMargin > 0
            ? coordinate - toolTipHeight - toolTipMargin
            : Math.max(
                0,
                Math.min(
                  chartContainerRef.current.clientHeight - toolTipHeight - toolTipMargin,
                  coordinate - toolTipMargin,
                ),
              );

        console.log('coordinateY', coordinateY);

        toolTip.style.left = `${shiftedCoordinate}px`;
        toolTip.style.top = `${coordinateY}px`;
      }
    });

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [data]);

  return <Box ref={chartContainerRef} w="100%" />;
};

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

export default function Chart() {
  const { data, loading, error } = useAssetFetch(
    createAssetTimeSeriesURL({
      metricID: 'price',
      params: parseTimeSeriesParamsAsString({
        start: '1970-01-01',
        end: getCurrentDate(),
        interval: '1w',
      }),
    }),
  );

  console.log('data', data);

  if (loading) return <Loader />;

  if (error) return <ErrorText text={JSON.stringify(error)} />;

  return (
    <>
      <ChartComponent data={initialData} />
    </>
  );
}
