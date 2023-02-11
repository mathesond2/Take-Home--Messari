const messariAPI = 'https://data.messari.io/api/';

export type fetchFnNames = 'fetchV1AssetTimeSeriesData' | 'fetchV1AssetMetricsData' | 'fetchV2AssetsData';

export const fetchV1AssetTimeSeriesData = async (assetKey: string, metricID: any, params: any) => {
  const url = `${messariAPI}/v1/assets/${assetKey}/metrics/${metricID}/time-series?${params}`;
  const data = await callEndpoint(url);
  return data;
};

export const fetchV1AssetMetricsData = async (assetKey: string, params: any) => {
  const url = `${messariAPI}/v1/assets/${assetKey}/metrics?${params}`;
  const data = await callEndpoint(url);
  return data;
};

export const fetchV2AssetsData = async (params: any) => {
  const url = `${messariAPI}/v2/assets?${params}`;
  const data = await callEndpoint(url);
  return data;
};

const callEndpoint = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
