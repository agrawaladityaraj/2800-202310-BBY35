import Link from "next/link";
import { Button, Card, Text } from "@mantine/core";

interface IProps {
  title: string;
  content: string;
  link: string;
  button: string;
}

export default function JourneyStep({ title, content, link, button }: IProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text weight={500}>{title}</Text>
      <Text size="sm" color="dimmed">
        {content}
      </Text>
      <Link style={{ textDecoration: "none" }} href={link} passHref={true}>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          {button}
        </Button>
      </Link>
    </Card>
  );
}
