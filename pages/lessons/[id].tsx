import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import AuthWrapper from "@/components/AuthWrapper";

import Context from "@/Context/Context";
import Constants from "@/Constants";

import { IContext, IDog } from "@/models";

export default function DogLessons() {
  const router = useRouter();
  const { id } = router.query;

  const [dog, setDog] = useState<IDog>(Constants.EmptyDog);
  const { user, setAlert }: IContext = useContext(Context);

  const fetchDogData = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/dog/${userId}`);
      const selectedDog = data.find((dg: IDog) => dg.id === id);
      if (selectedDog) {
        setDog(selectedDog);
      }
    } catch (error) {
      setAlert({ open: true, payload: "Dog not found!", severity: "error" });
    }
  };

  useEffect(() => {
    if (user.id && id) {
      (async () => {
        await fetchDogData(user.id);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  return (
    <AuthWrapper>
      <div></div>
    </AuthWrapper>
  );
}
