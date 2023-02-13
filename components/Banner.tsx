import { Box, Heading, Tag, Text } from '@chakra-ui/react';

export default function Banner({ name, symbol, price }: { name: string; symbol: string; price: number }) {
  const formattedUSD =
    price &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  return (
    <Box my={10} display="flex" alignItems="center">
      <Heading mr={4}>{name}</Heading>
      {symbol && <Tag mr={4}>{symbol}</Tag>}
      <Text mr={4}>{formattedUSD}</Text>
    </Box>
  );
}
