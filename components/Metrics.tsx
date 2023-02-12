import { useFetch } from '@/util/useFetch';
import { Text } from '@chakra-ui/react';
import ErrorText from './ErrorText';
import Loader from './Loader';

function parseMetricsParams(fields: string[]) {
  return `?fields=${fields.join(',')}`;
}

export default function Metrics() {
  // const { data, loading, error } = useFetch('assetMetrics', {
  //   params: parseMetricsParams(['market_data', 'marketcap', 'name', 'symbol']),
  // });
  // console.log('Metrics', data, loading, error);

  // if (loading) return <Loader />;

  // if (error) return <ErrorText text={JSON.stringify(error)} />;

  return (
    <>
      <Text>Metrics</Text>
    </>
  );
}
