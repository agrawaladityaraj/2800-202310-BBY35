import React, { useState, useEffect } from "react";

export default function MountedWrapper({
  children,
}: {
  children: JSX.Element;
}) {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
}
