import { formatUSD } from '@/util/metrics';
import { Box, Heading, Tag, Text } from '@chakra-ui/react';

export default function Banner({ name, symbol, price }: { name: string; symbol: string; price: number }) {
  if (!name) return null;
  return (
    <Box my={10} display="flex" alignItems="center">
      <Heading mr={4}>{name}</Heading>
      {symbol && <Tag mr={4}>{symbol}</Tag>}
      {price && <Text mr={4}>{formatUSD(price)}</Text>}
    </Box>
  );
}
