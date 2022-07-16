import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { address } = req.query
      const nonce = Math.floor(Math.random() * 1e6)

      res.status(200)
      res.json({ address, nonce })
      break

    default:
      res.setHeader('Allow', 'GET')
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
