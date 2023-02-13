import { parseMetricsData } from '@/util/metrics';
import { FetchState } from '@/util/useAssetFetch';
import { Box, Center, Flex, List, ListItem, Text } from '@chakra-ui/react';
import Loader from './Loader';

type MetricData = { [key: string]: string | number | object };

function parseMetrics(data: MetricData) {
  return Object.keys(data)
    .filter((key) => typeof data[key] !== 'object')
    .map((key) => parseMetricsData(key, data[key] as string | number));
}

function DataList({ data, children }: { data: MetricData; children: React.ReactNode }) {
  const parsedMetrics = parseMetrics(data);
  return (
    <Box mb={8}>
      {children}
      <List>
        {parsedMetrics.map((metric) => {
          const key = Object.keys(metric)[0];
          const value = Object.values(metric)[0];
          return (
            <ListItem key={key} display="flex" justifyContent="space-between">
              <span>{key}</span>
              <span>{value}</span>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default function Metrics({ metricsData }: { metricsData: FetchState }) {
  const { loading, error, data } = metricsData || {};
  const { market_data, marketcap } = data || {};

  if (loading) return <Loader />;

  if (error)
    return (
      <Center>
        <Text>Metric data unavailable</Text>
      </Center>
    );

  return (
    <>
      <Flex direction="column">
        {marketcap && (
          <DataList data={marketcap}>
            <Text as="b">Market Cap</Text>
          </DataList>
        )}
        {market_data && (
          <DataList data={market_data}>
            <Text as="b">Market Data</Text>
          </DataList>
        )}
      </Flex>
    </>
  );
}
