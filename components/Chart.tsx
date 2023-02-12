import { useFetchData } from '@/util/hooks';
import { Text } from '@chakra-ui/react';
import ErrorText from './ErrorText';
import Loader from './Loader';
import type { TimeSeriesParam } from '@/util/apiCalls';

function parseTimeSeriesParamsAsString(params: TimeSeriesParam) {
  return Object.keys(params)
    .map((key, i) => `${key}=${params[key as keyof TimeSeriesParam]}${i + 1 < Object.keys(params).length ? '&' : ''}`)
    .join('');
}

function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

export default function Chart() {
  const { data, loading, error } = useFetchData('timeSeries', {
    metricID: 'price',
    params: parseTimeSeriesParamsAsString({
      start: '1970-01-01',
      end: getCurrentDate(),
      interval: '1w',
    }),
  });
  console.log('zzz', data, loading, error);

  if (loading) return <Loader />;

  if (error) return <ErrorText text={JSON.stringify(error)} />;

  return (
    <>
      <Text>Data: {data && JSON.stringify(data)}</Text>
    </>
  );
}
