import { useEffect, useState } from "react";
import Link from "next/link";

// Assume we have a function to fetch dogs data from a database
// import { getDogsForUser } from '../lib/api';

function Dog() {
  const [dogs, setDogs] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchDogs() {
      // Assuming the user's ID is 1 for simplicity
      // const data = await getDogsForUser(1);
      // For demonstration, we'll use static data
      const data = [
        { id: "1", name: "Max" },
        { id: "2", name: "Bella" },
        // ... add more dogs
      ];
      setDogs(data);
    }

    fetchDogs();
  }, []);

  if (!dogs.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Dogs</h1>
      {dogs.map((dog) => (
        <div key={dog.id}>
          <Link href={`/dog/${dog.id}`}>{dog.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Dog;
