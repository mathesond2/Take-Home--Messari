import Banner from '@/components/Banner';
import ChartContainer from '@/components/ChartContainer';
import Metrics from '@/components/Metrics';
import { useAssetFetch } from '@/util/useAssetFetch';
import { Box } from '@chakra-ui/react';

type MetricsData = {
  name: string;
  symbol: string;
  market_data: {
    price_usd: number;
  };
};

function parseMetricsParams(fields: string[]) {
  return `?fields=${fields.join(',')}`;
}

export default function Home() {
  const metricsData: {
    data: MetricsData;
    loading: boolean;
    error: any;
  } = useAssetFetch(`metrics${parseMetricsParams(['market_data', 'marketcap', 'name', 'symbol'])}`);

  const { error, data } = metricsData;
  const { name, symbol, market_data } = (!error && data) || {
    name: '',
    symbol: '',
    market_data: {
      price_usd: 0,
    },
  };

  return (
    <main>
      <Banner name={name} symbol={symbol} price={market_data.price_usd} />
      <Box display="flex" flexDir="column" mt={10}>
        <ChartContainer />
        <Metrics metricsData={metricsData} />
      </Box>
    </main>
  );
}
