import '@/styles/globals.css';
import { AssetProvider } from '@/util/AssetContext';
import { theme } from '@/util/theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import HeadContent from '../components/HeadContent';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <HeadContent />
      </Head>
      <ChakraProvider theme={theme}>
        <AssetProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AssetProvider>
      </ChakraProvider>
    </>
  );
}
