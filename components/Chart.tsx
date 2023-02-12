import { useFetchData } from '@/util/hooks';
import { Text } from '@chakra-ui/react';
import ErrorText from './ErrorText';
import Loader from './Loader';

const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export default function Chart() {
  const { data, loading, error } = useFetchData('timeSeries', {
    metricID: 'price',
    params: {
      start: '1970-01-01',
      end: getCurrentDate(),
      interval: '1w',
    },
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
