import type { NextApiRequest, NextApiResponse } from "next";
import { fetchOptions } from "@/lib/fetchConfig";
import { ConfigApi } from "@/types/configApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConfigApi>,
) {
  const configRes = await fetch(
    "https://api.themoviedb.org/3/configuration",
    fetchOptions,
  );
  const result: ConfigApi = await configRes.json();

  console.log(result);
  res.status(200).json({
    images: {
      base_url: result.images.base_url,
      secure_base_url: result.images.secure_base_url,
    },
  });
}
