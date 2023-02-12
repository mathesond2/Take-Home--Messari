import { useEffect, useReducer } from 'react';
import { fetchFns } from './apiCalls';
import type { FetchFnName, FetchParams, TimeSeriesParams, TimeSeriesParam } from './apiCalls';
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
// TODO: implement 'FetchParams' type for 'params'
export const useFetchData = (dataType: FetchFnName, args: TimeSeriesParams) => {
  const [assetData, dispatchAssetData] = useReducer(fetchDataReducer, initialFetchData);
  const { asset } = useAsset();

  args.asset = asset;

  const { data, loading, error } = assetData;

  const { params } = args;
  const parsedParamString: string = Object.keys(params)
    .map((key, i) => `${key}=${params[key as keyof TimeSeriesParam]}${i + 1 < Object.keys(params).length ? '&' : ''}`)
    .join('');

  const parsedArgs = {
    ...args,
    params: parsedParamString,
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatchAssetData({ type: 'loading' });
      try {
        const data = await fetchFns[dataType](parsedArgs);
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
};
