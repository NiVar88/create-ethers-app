import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(403)
      res.end('Access denied!')
      break

    default:
      res.setHeader('Allow', 'GET')
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}
