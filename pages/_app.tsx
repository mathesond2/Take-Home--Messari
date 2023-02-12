import '@/styles/globals.css';
import { theme } from '@/util/theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { AssetProvider } from '@/util/AssetContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AssetProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AssetProvider>
    </ChakraProvider>
  );
}
