// import required packages
const fs = require("fs");
const csvParser = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

async function importCSV() {
  const fileStream = fs.createReadStream("dog_breeds.csv");
  fileStream
    .pipe(csvParser())
    .on("data", async (row) => {
      await createDogBreed(row);
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");
      await prisma.$disconnect();
    });
}

importCSV();
