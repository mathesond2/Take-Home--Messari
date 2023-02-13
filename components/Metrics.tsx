import { FetchState } from '@/util/useAssetFetch';
import { Box, Flex, ListItem, Text, List } from '@chakra-ui/react';
import ErrorText from './ErrorText';
import Loader from './Loader';
import { parseMarketCapKeys } from '@/util/metrics';

function DataList({ data, children }: { data: any; children: React.ReactNode }) {
  return (
    <Box mb={8}>
      {children}
      <List>
        {Object.keys(data).map((key) => (
          <ListItem key={key} display="flex" justifyContent="space-between">
            <span>{parseMarketCapKeys(key)}</span>
            <span>{JSON.stringify(data[key])}</span>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function Metrics({ metricsData }: { metricsData: FetchState }) {
  const { loading, error, data } = metricsData || {};
  const { market_data, marketcap } = data?.data || {};

  if (loading) return <Loader />;

  if (error) return <ErrorText text={JSON.stringify(error)} />;

  console.log('metrics data', market_data, marketcap);

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
