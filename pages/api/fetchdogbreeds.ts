import prisma from "@/lib/prisma";

export default async function handler(_: NextFetchRequestConfig, res: any) {
  try {
    const dogBreeds = await prisma.dogBreed.findMany();
    res.status(200).json(dogBreeds);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dog breeds" });
  } finally {
    await prisma.$disconnect();
  }
}
