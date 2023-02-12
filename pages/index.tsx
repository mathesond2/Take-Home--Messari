import Banner from '@/components/Banner';
import Chart from '@/components/Chart';
import Metrics from '@/components/Metrics';
import { Box } from '@chakra-ui/react';

export default function Home() {
  return (
    <main>
      <Banner />
      <Box display="flex" flexDir="row" mt={10}>
        <Chart />
        <Metrics />
      </Box>
    </main>
  );
}
