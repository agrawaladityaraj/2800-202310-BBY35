import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Assume we have a function to fetch a specific dog's data from a database
// import { getDogData } from '../lib/api';

interface Dog {
  id: string;
  name: string;
  // Add more properties as needed
}

function DogPage() {
  const router = useRouter();
  const { id } = router.query;

  const [dog, setDog] = useState<Dog | null>(null);

  useEffect(() => {
    async function fetchDog() {
      if (id) {
        // const data = await getDogData(id);
        // For demonstration, we'll use static data
        const data: Dog = { id: "1", name: "Max" };
        setDog(data);
      }
    }

    fetchDog();
  }, [id]);

  if (!dog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{dog.name}</h1>
      {/* Display other information about the dog here */}
    </div>
  );
}

export default DogPage;
