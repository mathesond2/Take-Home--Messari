import { roundToTwoDecimals } from '@/util/metrics';
import { createAssetTimeSeriesURL, getCurrentDate, parseTimeSeriesParamsAsString } from '@/util/timeSeries';
import { useAssetFetch } from '@/util/useAssetFetch';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import ErrorText from './ErrorText';
import Loader from './Loader';
import { Chart } from './Chart';
import type { ChartData } from './Chart';

function parseChartData(data: number[][]): ChartData[] {
  return data.map((item) => {
    const time = new Date(item[0]).toISOString().split('T')[0];
    const value = roundToTwoDecimals(item[4]); // 'close' value
    return { time, value };
  });
}

export default function ChartContainer() {
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
      <Chart data={parsedChartData} />
    </Box>
  );
}
