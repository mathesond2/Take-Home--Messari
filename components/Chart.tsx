import { createAssetTimeSeriesURL, getCurrentDate, parseTimeSeriesParamsAsString } from '@/util/timeSeries';
import { useAssetFetch } from '@/util/useAssetFetch';
import { Text } from '@chakra-ui/react';
import ErrorText from './ErrorText';
import Loader from './Loader';

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

  if (loading) return <Loader />;

  if (error) return <ErrorText text={JSON.stringify(error)} />;

  return (
    <>
      <Text>Data: {data && JSON.stringify(data)}</Text>
    </>
  );
}
