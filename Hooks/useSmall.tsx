import { useState, useEffect } from "react";

const useSmall = (width: number) => {
  const getSmall = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < width;
    }
    return false;
  };

  const [small, setSmall] = useState<boolean>(getSmall());

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSmall(getSmall());
    });
    setTimeout(() => {
      setSmall(false);
      setSmall(getSmall());
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return small;
};

export default useSmall;
