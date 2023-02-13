import { roundToTwoDecimals } from '@/util/metrics';
import { createAssetTimeSeriesURL, getCurrentDate, parseTimeSeriesParamsAsString } from '@/util/timeSeries';
import { useAssetFetch } from '@/util/useAssetFetch';
import { Box } from '@chakra-ui/react';
import { ColorType, createChart, MouseEventParams } from 'lightweight-charts';
import { useEffect, useMemo, useRef } from 'react';
import ErrorText from './ErrorText';
import Loader from './Loader';

function createToolTipElement() {
  const toolTip = document.createElement('div');
  toolTip.style.width = '180px';
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
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
        horzTouchDrag: false,
        vertTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: false,
        mouseWheel: false,
        pinch: false,
      },
    });

    const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
    newSeries.setData(data);

    const toolTipWidth = 180;
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
          <div style="color: ${'black'}">${time}</div>
          <div style="font-size: 16px; margin: 4px 0px; color: ${'black'}">Close: $${price}</div>
        `;

        const coordinate = newSeries.priceToCoordinate(price);
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

function parseChartData(data: number[][]): ChartData[] {
  return data.map((item) => {
    const time = new Date(item[0]).toISOString().split('T')[0];
    const value = roundToTwoDecimals(item[4]); // 'close' value
    return {
      time,
      value,
    };
  });
}

export default function Chart() {
  const { data, loading, error } = useAssetFetch(
    createAssetTimeSeriesURL({
      metricID: 'price',
      params: parseTimeSeriesParamsAsString({
        start: '1970-01-01',
        end: getCurrentDate(),
        interval: '1w',
        order: 'ascending',
      }),
    }),
  );

  const parsedChartData = useMemo(() => {
    const values = data?.data?.values;
    if (values) {
      return parseChartData(values);
    }
    return [];
  }, [data]);

  if (loading) return <Loader />;

  if (error) return <ErrorText text={JSON.stringify(error)} />;

  return (
    <Box mb={8}>
      <ChartComponent data={parsedChartData} />
    </Box>
  );
}
