import Banner from '@/components/Banner';
import Chart from '@/components/Chart';
import Metrics from '@/components/Metrics';
import { useAssetFetch } from '@/util/useAssetFetch';
import { Box } from '@chakra-ui/react';

type MetricsData = {
  data: {
    name: string;
    symbol: string;
    market_data: {
      price_usd: number;
    };
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

  const { name, symbol, market_data } = metricsData?.data?.data || {
    name: '',
    symbol: '',
    market_data: {},
  };

  return (
    <main>
      <Banner name={name} symbol={symbol} price={market_data.price_usd} />
      <Box display="flex" flexDir="row" mt={10}>
        <Chart />
        <Metrics metricsData={metricsData} />
      </Box>
    </main>
  );
}
