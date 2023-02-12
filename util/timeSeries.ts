import { useAsset } from './AssetContext';

type TimeSeriesParams = {
  asset?: string;
  metricID: string;
  params: string;
};

export const createAssetTimeSeriesURL = (args: TimeSeriesParams) => {
  const { metricID, params } = args;
  return `metrics/${metricID}/time-series?${params}`;
};

// const createAssetMetricsUrl = async (args: {
//   asset?: string;
//   params: string;
// }) => {
//   const { asset, params } = args;
//   return `v1/assets/${asset}/metrics?${params}`;
// };

type TimeSeriesParam = {
  start: string;
  end: string;
  interval: string;
};

export function parseTimeSeriesParamsAsString(params: TimeSeriesParam) {
  return Object.keys(params)
    .map((key, i) => `${key}=${params[key as keyof TimeSeriesParam]}${i + 1 < Object.keys(params).length ? '&' : ''}`)
    .join('');
}

export function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}
