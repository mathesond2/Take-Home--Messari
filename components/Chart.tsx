import { useFetchData } from '@/util/hooks';
import { Text } from '@chakra-ui/react';

const createDefaultTimeSeriesParamString = () => {
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  const defaultTimeSeriesParams = {
    start: '1970-01-01',
    end: getCurrentDate(),
    interval: '1w',
  };

  type DefaultTimeSeriesParams = typeof defaultTimeSeriesParams;

  const parsedParamString: string = Object.keys(defaultTimeSeriesParams)
    .map(
      (key, i) =>
        `${key}=${defaultTimeSeriesParams[key as keyof DefaultTimeSeriesParams]}${
          i + 1 < Object.keys(defaultTimeSeriesParams).length ? '&' : ''
        }`,
    )
    .join('');

  return parsedParamString;
};

export default function Chart() {
  const { data, loading, error } = useFetchData('timeSeries', {
    metricID: 'price',
    params: createDefaultTimeSeriesParamString(),
  });
  console.log('zzz', data, loading, error);
  return (
    <>
      <Text>Chart</Text>
    </>
  );
}
