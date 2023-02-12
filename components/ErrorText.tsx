import { Text } from '@chakra-ui/react';

export default function ErrorText({ text }: { text: string }) {
  return (
    <Text style={{ whiteSpace: 'pre-wrap' }} color="red.300" as="b">
      {text}
    </Text>
  );
}
