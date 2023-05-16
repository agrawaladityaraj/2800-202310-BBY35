import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function AuthWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const { status } = useSession();
  if (status === "unauthenticated") {
    signIn();
  }

  return children;
}
