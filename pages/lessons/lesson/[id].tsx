import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Stack, Title, List, Group, ActionIcon } from "@mantine/core";

import AuthWrapper from "@/components/AuthWrapper";

import Context from "@/Context/Context";
import Constants from "@/Constants";

import { IContext, ILesson } from "@/models";

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
      <div></div>
    </AuthWrapper>
  );
}
