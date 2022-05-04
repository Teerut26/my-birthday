import db from "@config/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

interface inputData {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(500).end();
    }
    const snapshot = await db.collection("wish");

    await snapshot.add({
        message: req.body.message,
    } as inputData);

    res.status(200).json({ message: "ok" });
}

export const config = {
    api: {
        bodyParser: true,
    },
};
