import React, { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import axios from "axios";

import Context from "@/Context/Context";
import { IContext } from "@/models";

export default function AuthWrapper({ children }: { children: JSX.Element }) {
  const { status, data } = useSession();
  const { setUser }: IContext = useContext(Context);
  if (status === "unauthenticated") {
    signIn();
  }

  useEffect(() => {
    (async () => {
      if (status === "authenticated") {
        const res = await axios.get(`/api/user/${data.user?.email}`);
        setUser({
          email: res.data.email,
          name: res.data.name,
          image: res.data.image,
          id: res.data.id,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return children;
}
