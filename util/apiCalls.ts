export type FetchFnName = 'timeSeries' | 'assetMetrics' | 'assetsData';

export type FetchParams = TimeSeriesParams | AssetMetricsParams;

export type TimeSeriesParams = {
  asset?: string;
  metricID: string;
  params: string;
};

const fetchV1AssetTimeSeriesData = async (args: TimeSeriesParams) => {
  const { asset, metricID, params } = args;
  const url = `v1/assets/${asset}/metrics/${metricID}/time-series?${params}`;
  const data = await callEndpoint(url);
  console.log(`data is: ${JSON.stringify(data)}`);
  return data;
};

type AssetMetricsParams = {
  asset?: string;
  params: string;
};

const fetchV1AssetMetricsData = async (args: AssetMetricsParams) => {
  const { asset, params } = args;
  const url = `v1/assets/${asset}/metrics?${params}`;
  const data = await callEndpoint(url);
  return data;
};

const fetchV2AssetsData = async (params: any) => {
  const url = `v2/assets?${params}`;
  const data = await callEndpoint(url);
  return data;
};

//TODO: make this more generic
const callEndpoint = async (path: string) => {
  const messariAPI = 'https://data.messari.io/api';
  const headers = new Headers();
  headers.append('x-messari-api-key', process.env.NEXT_PUBLIC_MESSARI_API_KEY!);

  const req = new Request(`${messariAPI}/${path}`, {
    method: 'GET',
    headers,
  });
  const response = await fetch(req);
  const data = await response.json();
  return data;
};

export const fetchFns = {
  timeSeries: fetchV1AssetTimeSeriesData,
  assetMetrics: fetchV1AssetMetricsData,
  assetsData: fetchV2AssetsData,
};