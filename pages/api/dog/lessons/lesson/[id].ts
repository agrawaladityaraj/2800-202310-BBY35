import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id?.toString() ?? "",
      },
      include: {
        exercises: true,
      },
    });
    res.status(200).json(lesson);
  }
}
