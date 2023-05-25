import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Stack, Title, List, Group, ActionIcon } from "@mantine/core";
import { ExternalLink } from "tabler-icons-react";

import AuthWrapper from "@/components/AuthWrapper";

import Context from "@/Context/Context";
import Constants from "@/Constants";

import { IContext, IDog, ILesson } from "@/models";

export default function DogLessons() {
  const router = useRouter();
  const { id } = router.query;

  const [dog, setDog] = useState<IDog>(Constants.EmptyDog);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const { user, setAlert }: IContext = useContext(Context);

  const fetchDogData = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/dog/${userId}`);
      const selectedDog = data.find((dg: IDog) => dg.id === id);
      if (selectedDog) {
        setDog(selectedDog);
      } else {
        setAlert({ open: true, payload: "Dog not found!", severity: "error" });
      }
    } catch (error) {
      setAlert({ open: true, payload: "Dog not found!", severity: "error" });
    }
  };

  const fetchLessons = async (dogId: string) => {
    try {
      const { data } = await axios.get(`/api/dog/lessons/${dogId}`);
      setLessons(data);
    } catch (error) {
      setAlert({
        open: true,
        payload: "Something went wrong!",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (user.id && id) {
      (async () => {
        await fetchDogData(user.id);
        await fetchLessons(id.toString());
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  return (
    <AuthWrapper>
      <Stack sx={{ padding: "4vw", paddingTop: "1em" }} spacing={3}>
        <Title sx={{ marginBottom: "0.45em" }} order={3}>
          Lessons for {dog.name}, the {dog.breed.breed}
        </Title>
        <List>
          {lessons.map((lesson: ILesson) => (
            <List.Item key={lesson.id}>
              <Group sx={{ "&:hover": { textDecoration: "underline" } }}>
                <a
                  style={{ color: "#212121", textDecoration: "none" }}
                  href={`/lessons/lesson/${lesson.id}`}
                >
                  {lesson.lessonName}
                </a>
                <ActionIcon variant="transparent">
                  <ExternalLink size="1rem" />
                </ActionIcon>
              </Group>
            </List.Item>
          ))}
        </List>
      </Stack>
    </AuthWrapper>
  );
}
