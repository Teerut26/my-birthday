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

    let lists: Data[] = [];

    snapshot.forEach((doc) => {
        console.log(doc.createTime.toDate);
        lists.push({
            message: doc.data().message,
            createTime: String(doc.createTime.toDate().toISOString()),
        } as Data);
    });

    res.status(200).json(_.sortBy(lists, (v) => {return v.createTime}).reverse());
}
