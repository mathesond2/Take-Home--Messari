import { useEffect, useReducer } from 'react';
import { AssetMetricsParams, fetchFns } from './apiCalls';
import type { TimeSeriesParams } from './apiCalls';
import { useAsset } from './AssetContext';

type FetchAction = {
  readonly type: 'error' | 'loading' | 'success';
  readonly data?: any | null;
};

type FetchState = {
  error: boolean;
  loading: boolean;
  data: any | null;
};

const initialFetchData: FetchState = {
  error: false,
  loading: false,
  data: null,
};

const fetchDataReducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
    case 'error':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'loading':
      return {
        ...state,
        loading: true,
      };
    case 'success':
      return {
        error: false,
        loading: false,
        data: action.data || null,
      };
    default:
      throw new Error('Unhandled action type: ' + action.type);
  }
};

export function useFetchData(dataType: 'timeSeries', args: TimeSeriesParams): FetchState;
export function useFetchData(dataType: 'assetMetrics', args: AssetMetricsParams): FetchState;
export function useFetchData(dataType: unknown, args: unknown): FetchState {
  const [assetData, dispatchAssetData] = useReducer(fetchDataReducer, initialFetchData);
  const { asset } = useAsset();
  (args as TimeSeriesParams | AssetMetricsParams).asset = asset;

  const { data, loading, error } = assetData;

  useEffect(() => {
    const fetchData = async () => {
      dispatchAssetData({ type: 'loading' });
      try {
        const data = await fetchFns[dataType as 'timeSeries' | 'assetMetrics'](args as any); //TODO: type this better
        dispatchAssetData({
          type: 'success',
          data,
        });
      } catch (error) {
        dispatchAssetData({ type: 'error' });
        console.error(`error: ${error}`);
      }
    };

    //TODO: consider using a ref to store the asset data
    if (!data && !error && asset) {
      fetchData();
    }
  }, [fetchFns, dataType, asset]);

  return { data, loading, error };
}
