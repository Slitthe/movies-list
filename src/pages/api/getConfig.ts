import type { NextApiRequest, NextApiResponse } from "next";

import { ConfigApi } from "@/types/configApi";
import { fetchOptions } from "@/lib/fetchConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConfigApi>,
) {
  const configRes = await fetch(
    "https://api.themoviedb.org/3/configuration",
    fetchOptions,
  );
  const result: ConfigApi = await configRes.json();

  res.status(200).json({
    images: {
      base_url: result.images.base_url,
      secure_base_url: result.images.secure_base_url,
    },
  });
}
