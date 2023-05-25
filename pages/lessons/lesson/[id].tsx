import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import {
  Stack,
  Title,
  List,
  Group,
  Text,
  Accordion,
  Button,
} from "@mantine/core";
import { ArrowBadgeLeft } from "tabler-icons-react";

import AuthWrapper from "@/components/AuthWrapper";
import AccordionLabel from "@/components/AccordionLabel";

import Context from "@/Context/Context";
import Constants from "@/Constants";

import { IContext, ILesson, IExercise } from "@/models";

export default function Lesson() {
  const router = useRouter();
  const { id } = router.query;
  const { setAlert }: IContext = useContext(Context);

  const [lesson, setLesson] = useState<ILesson>(Constants.EmptyLesson);

  const fetchLesson = async (lessonId: string) => {
    try {
      const { data } = await axios.get(`/api/dog/lessons/lesson/${lessonId}`);
      setLesson(data);
    } catch (error) {
      setAlert({ open: true, payload: "Lesson not found!", severity: "error" });
    }
  };

  useEffect(() => {
    if (id) {
      (async () => {
        await fetchLesson(id.toString());
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <AuthWrapper>
      <Stack sx={{ padding: "4vw", paddingTop: "1em" }} spacing={3}>
        <Title sx={{ marginBottom: "0.45em" }} order={2}>
          {lesson.lessonName}
        </Title>
        <Group spacing={1}>
          <Text sx={{ marginRight: "5px" }} c="dimmed">
            Why is this lesson required?{" "}
          </Text>
          <Text>{lesson.lessonReason}</Text>
        </Group>
        <Stack spacing={1}>
          <Text c="dimmed">Lesson objectives:</Text>
          <List>
            {lesson.lessonObjectives.map((objective: string, index: number) => (
              <List.Item key={index}>
                <Text>{objective}</Text>
              </List.Item>
            ))}
          </List>
        </Stack>
        <Title sx={{ marginTop: "0.45em", marginBottom: "0.45em" }} order={4}>
          Exercises:
        </Title>
        <Accordion chevronPosition="right" variant="contained">
          {lesson.exercises.map((exercise: IExercise) => (
            <Accordion.Item value={exercise.id} key={exercise.id}>
              <Accordion.Control>
                <AccordionLabel
                  name={exercise.name}
                  objective={exercise.objective}
                />
              </Accordion.Control>
              <Accordion.Panel>
                <Stack
                  sx={{ padding: "1em", paddingLeft: 0, paddingTop: 0 }}
                  spacing={4}
                >
                  <Stack spacing={2}>
                    <Title order={5}>Steps:</Title>
                    <List withPadding>
                      {exercise.steps.map((step: string, index: number) => (
                        <List.Item key={index}>
                          <Text fz="sm">{step}</Text>
                        </List.Item>
                      ))}
                    </List>
                  </Stack>
                  <Stack spacing={2}>
                    <Title order={5}>Tips:</Title>
                    <List withPadding>
                      {exercise.tips.map((tip: string, index: number) => (
                        <List.Item key={index}>
                          <Text fz="sm">{tip}</Text>
                        </List.Item>
                      ))}
                    </List>
                  </Stack>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <Link href={`/lessons/${lesson.dogId}`}>
          <Button
            leftIcon={<ArrowBadgeLeft size="1rem" />}
            sx={{ marginTop: "1em" }}
            size="sm"
          >
            Back to Lessons
          </Button>
        </Link>
      </Stack>
    </AuthWrapper>
  );
}
