import type { NextApiRequest, NextApiResponse } from 'next'

const EGESTO_API_URL = process.env.EGESTO_API_URL
const EGESTO_TENANT = process.env.EGESTO_TENANT

export const runtime = "edge";

export interface ProductSize {
  name: string
}

interface Response {
  docs: {
    name: string;
    marketing: {
      photos?: string[];
      description: string;
    };
    sizes?: ProductSize[];
    price: number;
  }[];
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (!EGESTO_API_URL || !EGESTO_TENANT) {
    return res.status(500).json({ docs: [] })
  }

  const data = await fetch(`${EGESTO_API_URL}/v1/products/public`, {
    method: 'GET',
    headers: {
      'x-tenant': EGESTO_TENANT,
    }
  })

  const json = await data.json()

  res.status(200).json(json)
}
