import { Box, Heading, Tag, Text } from '@chakra-ui/react';
import { formatUSD } from '@/util/metrics';

export default function Banner({ name, symbol, price }: { name: string; symbol: string; price: number }) {
  return (
    <Box my={10} display="flex" alignItems="center">
      <Heading mr={4}>{name}</Heading>
      {symbol && <Tag mr={4}>{symbol}</Tag>}
      <Text mr={4}>{formatUSD(price)}</Text>
    </Box>
  );
}
