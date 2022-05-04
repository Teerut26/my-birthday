import db from "@config/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

interface Data {
    message: string;
    createTime: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const snapshot = await db.collection("wish").get();

    res.status(200).json({ size: snapshot.size });
}
