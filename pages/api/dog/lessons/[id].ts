import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    const lessons = await prisma.lesson.findMany({
      where: {
        dogId: id?.toString() ?? "",
      },
    });
    res.status(200).json(lessons);
  }
}
