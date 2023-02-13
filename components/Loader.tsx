import { CircularProgress, Container } from '@chakra-ui/react';

export default function Loader() {
  return (
    <Container centerContent>
      <CircularProgress isIndeterminate color="green.300" />
    </Container>
  );
}
