import { SearchIcon } from '@chakra-ui/icons';
import { Container, Flex, Input, InputGroup, InputLeftElement, Link } from '@chakra-ui/react';
import { useAsset } from '@/util/assetContext';

export default function Navbar() {
  const { asset, setAsset } = useAsset();
  return (
    <Container maxW="full" as="header" borderBottomWidth="1px" paddingX={10} paddingY={6}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/" _hover={{ textDecoration: 'none' }} fontWeight="extrabold">
          Asset Overview
        </Link>
        <InputGroup width={300}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search by asset name or symbol"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
          />
        </InputGroup>
      </Flex>
    </Container>
  );
}
