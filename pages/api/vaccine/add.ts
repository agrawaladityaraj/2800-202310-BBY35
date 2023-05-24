// pages/api/vaccine/add.ts

import type { NextApiRequest } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: any) {
    if(req.method === "POST") {
        const {name, date, dogId} = req.body;

        const vaccine = await prisma.vaccine.create({
            data: {
                name,
                date: new Date(date),
                dogId,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
        });

        res.status(200).json(vaccine);
    }
}