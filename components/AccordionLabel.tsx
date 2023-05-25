import { Stack, Text } from "@mantine/core";

interface IProps {
  name: string;
  objective: string;
}

export default function AccordionLabel({ name, objective }: IProps) {
  return (
    <Stack spacing={1}>
      <Text>{name}</Text>
      <Text size="sm" c="dimmed" weight={400}>
        {objective}
      </Text>
    </Stack>
  );
}
