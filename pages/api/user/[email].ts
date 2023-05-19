import prisma from "@/lib/prisma";
import type { NextApiRequest } from "next";

export default async function handle(req: NextApiRequest, res: any) {
  const { email } = req.query;
  if (req.method == "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email: email?.toString(),
      },
    });
    res.status(200).json(user);
  }
}
