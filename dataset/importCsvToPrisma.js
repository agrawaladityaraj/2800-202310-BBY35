/* 
Import required packages for
file system operations,
CSV parsing,
prisma ORM
*/
const fs = require("fs");
const csvParser = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Function to create a new dog breed in the database using the Prisma client
async function createDogBreed(breed) {
  await prisma.dogBreed.create({
    data: {
      breed: breed.Breed,
      countryOfOrigin: breed["Country of Origin"],
      furColor: breed["Fur Color"],
      heightIn: breed["Height (in)"],
      colorOfEyes: breed["Color of Eyes"],
      longevityYrs: breed["Longevity (yrs)"],
      characterTraits: breed["Character Traits"],
      commonHealthProblems: breed["Common Health Problems"],
    },
  });
}

// Function to import the CSV file and create a new dog breed for each row
async function importCSV() {
  // Create a read stream from the CSV file
  const fileStream = fs.createReadStream("dog_breeds.csv");
  // Use the csv-parser package to parse the CSV file
  fileStream
    .pipe(csvParser())
    .on("data", async (row) => {
      await createDogBreed(row);
    })
    // When the CSV file has been fully parsed, log a success message and disconnect from the database
    .on("end", async () => {
      console.log("CSV file successfully processed");
      await prisma.$disconnect();
    });
}

// Call the importCSV function
importCSV();
