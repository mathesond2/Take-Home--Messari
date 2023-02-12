import { parse } from 'path';
import { useEffect, useReducer } from 'react';
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

const fetchEndpoint = async (path: string) => {
  console.log('calling', path);
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

export function useAssetFetch(path: string): FetchState {
  const { asset } = useAsset();
  const [fetchData, dispatchFetchData] = useReducer(fetchDataReducer, initialFetchData);
  const { data, loading, error } = fetchData;

  useEffect(() => {
    const fetchData = async () => {
      dispatchFetchData({ type: 'loading' });
      try {
        const data = await fetchEndpoint(`v1/assets/${asset}/${path}`);
        dispatchFetchData({
          type: 'success',
          data,
        });
      } catch (error) {
        dispatchFetchData({ type: 'error' });
        console.error(`error: ${error}`);
      }
    };

    //TODO: consider using a ref to store the asset data
    if (!data && !error && asset) {
      fetchData();
    }
  }, [data, error, asset]);

  return { data, loading, error };
}
