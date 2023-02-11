import { useEffect, useReducer } from 'react';
import { fetchV1AssetTimeSeriesData, fetchV1AssetMetricsData, fetchV2AssetsData } from './apiCalls';

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

// export const useFetchV1AssetTimeSeriesData = (assetKey: string, metricID: any, params: any) => {
//   const [assetData, dispatchAssetData] = useReducer(fetchDataReducer, initialFetchData);

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatchAssetData({ type: 'loading' });
//       try {
//         const data = await fetchV1AssetTimeSeriesData(assetKey, metricID, params);
//         dispatchAssetData({
//           type: 'success',
//           data,
//         });
//       } catch (error) {
//         dispatchAssetData({ type: 'error' });
//         console.error(`error: ${error}`);
//       }
//     };
//     if (!assetData) {
//       fetchData();
//     }
//   }, [assetKey, metricID, params]);

//   const { data, loading, error } = assetData;

//   return { data, loading, error };
// }

export const useGenericFetchData = (fetchFn: Function, params: any) => {
  const [assetData, dispatchAssetData] = useReducer(fetchDataReducer, initialFetchData);

  useEffect(() => {
    const fetchData = async () => {
      dispatchAssetData({ type: 'loading' });
      try {
        const data = await fetchFn(params);
        dispatchAssetData({
          type: 'success',
          data,
        });
      } catch (error) {
        dispatchAssetData({ type: 'error' });
        console.error(`error: ${error}`);
      }
    };
    if (!assetData) {
      fetchData();
    }
  }, [fetchFn, params]);

  const { data, loading, error } = assetData;

  return { data, loading, error };
};
