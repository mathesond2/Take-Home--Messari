import { FetchState } from '@/util/useAssetFetch';
import { Text } from '@chakra-ui/react';
import ErrorText from './ErrorText';
import Loader from './Loader';

export default function Metrics({ metricsData }: { metricsData: FetchState }) {
  const { loading, error, data } = metricsData || {};

  if (loading) return <Loader />;

  if (error) return <ErrorText text={JSON.stringify(error)} />;

  return (
    <>
      <Text>Metrics {JSON.stringify(data)}</Text>
    </>
  );
}
