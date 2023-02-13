import { Box, Text } from '@chakra-ui/react';

export default function Banner({ name, symbol, price }: { name: string; symbol: string; price: number }) {
  return (
    <Box>
      <h1>{name}</h1>
      <Text as="b">{symbol}</Text>
      <Text as="b">{price}</Text>
    </Box>
  );
}
