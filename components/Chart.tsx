import { useFetchData } from '@/util/hooks';
import { Text } from '@chakra-ui/react';

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
  return (
    <>
      <Text>Chart</Text>
    </>
  );
}
