import Link from "next/link";
import { useEffect, useState, useContext } from "react";

import Context from "@/Context/Context";
import AuthWrapper from "@/components/AuthWrapper";

import { IContext } from "@/models";

interface Dog {
  id: string;
  name: string;
  ownerId: string;
}

function DogPage() {
  const { user }: IContext = useContext(Context);
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    if (user.id) {
      fetch(`/api/dog/${user.id}`)
        .then((response) => response.json())
        .then((data) => setDogs(data));
    }
  }, [user]);

  return (
    <AuthWrapper>
      <div>
        <h1>My Dogs</h1>
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>
              <Link href={`/dog/${dog.id}`}>{dog.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </AuthWrapper>
  );
}

export default DogPage;
