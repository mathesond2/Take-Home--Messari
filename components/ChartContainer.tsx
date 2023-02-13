import { roundToTwoDecimals } from '@/util/metrics';
import { createAssetTimeSeriesURL, getCurrentDate, parseTimeSeriesParamsAsString } from '@/util/timeSeries';
import { useAssetFetch } from '@/util/useAssetFetch';
import { Box, Center, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { ChartData } from './Chart';
import { Chart, CHART_HEIGHT } from './Chart';
import Loader from './Loader';

function parseChartData(data: number[][]): ChartData[] {
  return data.map((item) => {
    const time = new Date(item[0]).toISOString().split('T')[0];
    const value = roundToTwoDecimals(item[4]); // 'close' value
    return { time, value };
  });
}

const CenteredContent = ({ children }: { children: React.ReactNode }) => (
  <Box mb={8} h={`${CHART_HEIGHT}px`}>
    <Center h="100%" w="100%">
      {children}
    </Center>
  </Box>
);

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

  if (loading) {
    return (
      <CenteredContent>
        <Loader />
      </CenteredContent>
    );
  }

  if (error) {
    return (
      <CenteredContent>
        <Text>Data not found for asset. Please try again using a valid name or symbol.</Text>
      </CenteredContent>
    );
  }

  return (
    <CenteredContent>
      {parsedChartData.length ? <Chart data={parsedChartData} /> : <Text>Search for asset data</Text>}
    </CenteredContent>
  );
}
