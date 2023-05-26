import { NextApiRequest, NextApiResponse } from "next";

// import types for lesson request
import { ILessonsRequest } from "@/models";
import generateTraining from "@/defer/generateTraining";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonInfo: ILessonsRequest = req.body;
  const { dogId } = req.query;

  await generateTraining(lessonInfo, dogId?.toString() ?? "");
  res.status(200).send("Lesson generated!");
}
