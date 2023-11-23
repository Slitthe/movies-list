import type { NextApiRequest, NextApiResponse } from "next";

import { ConfigApi } from "@/types/configApi";
import { fetchOptions } from "@/lib/fetchConfig";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ConfigApi>,
) {

    console.log({ body: req.body });


    res.status(200).json({
        message: "ok"
    });
}
