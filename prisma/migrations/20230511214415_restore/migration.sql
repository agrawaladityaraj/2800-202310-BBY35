-- CreateTable
CREATE TABLE "DogBreed" (
    "id" STRING NOT NULL,
    "breed" STRING NOT NULL,
    "countryOfOrigin" STRING NOT NULL,
    "furColor" STRING NOT NULL,
    "heightIn" FLOAT8 NOT NULL,
    "colorOfEyes" STRING NOT NULL,
    "longevityYrs" FLOAT8 NOT NULL,
    "characterTraits" STRING NOT NULL,
    "commonHealthProblems" STRING NOT NULL,

    CONSTRAINT "DogBreed_pkey" PRIMARY KEY ("id")
);
