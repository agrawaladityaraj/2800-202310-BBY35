import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import {
  Stack,
  Title,
  List,
  Group,
  ActionIcon,
  Button,
  Text,
  Tooltip,
} from "@mantine/core";
import { ExternalLink } from "tabler-icons-react";

import AuthWrapper from "@/components/AuthWrapper";
import RickRoll from "@/components/RickRoll";
import useSmall from "@/Hooks/useSmall";

import Context from "@/Context/Context";
import Constants from "@/Constants";

import { IContext, IDog, ILesson } from "@/models";

export default function DogLessons() {
  const router = useRouter();
  const { id } = router.query;
  const small = useSmall(600);

  const [dog, setDog] = useState<IDog>(Constants.EmptyDog);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [open, setOpen] = useState<boolean>(false);
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
        {lessons.length ? (
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
        ) : (
          <Text>No lessons generated yet!</Text>
        )}
        {dog.generatingLessons ? (
          <Stack spacing={4}>
            <Tooltip label="This may take upto a minute...">
              <Button loading sx={{ marginTop: "0.5em" }} size="sm">
                Generating Lessons, check back after a few minutes...
              </Button>
            </Tooltip>
            <Text fz="sm" sx={{ color: "#495057" }}>
              Preview your lesson{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setOpen(true)}
              >
                here...
              </span>
            </Text>
          </Stack>
        ) : (
          <Link href={`/lessons/${id}/generate`}>
            <Button sx={{ marginTop: "0.5em" }} size="sm">
              Generate {lessons.length ? "More " : ""}Lessons
            </Button>
          </Link>
        )}
        <RickRoll open={open} setOpen={setOpen} small={small} />
      </Stack>
    </AuthWrapper>
  );
}
