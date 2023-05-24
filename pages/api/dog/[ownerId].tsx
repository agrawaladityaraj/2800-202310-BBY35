import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ownerId } = req.query;
  if (req.method === "GET") {
    const dogs = await prisma.dog.findMany({
      include: {
        breed: true,
        vaccines: true,
      },
      where: {
        ownerId: ownerId?.toString(),
      },
    });

    res.status(200).json(dogs);
  }
}
