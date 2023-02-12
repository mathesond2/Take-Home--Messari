import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

const AssetContext = createContext<{ asset: string; setAsset: Dispatch<SetStateAction<string>> } | undefined>(
  undefined,
);

export function AssetProvider({ children }: { children: ReactNode }) {
  const [asset, setAsset] = useState('');
  const value = { asset, setAsset };
  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
}

export function useAsset() {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAsset must be used within a AssetProvider');
  }
  return context;
}
