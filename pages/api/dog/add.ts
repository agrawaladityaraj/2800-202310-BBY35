import type { NextApiRequest } from "next";

import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const { stage, name, birthDate, breedId, ownerId } = req.body;
    const dog = await prisma.dog.create({
      data: {
        stage,
        name,
        birthDate: new Date(birthDate),
        breedId,
        ownerId,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    });
    res.status(200).json(dog);
  }
}
