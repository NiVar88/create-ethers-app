import { NextApiRequest, NextApiResponse } from 'next'
import { formatISO } from 'date-fns'
import type { User } from '@/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  switch (req.method) {
    case 'GET':
      const { address } = req.query
      const _address = typeof address === 'object' ? address[0] : address

      res.status(200)
      res.json({
        uid: 1,
        role: 'guest',
        avatar: '/static/media/99276610.png',
        address: `${_address}`,
        displayName: 'display name',
        bio: 'Lorem ipsum dolor sit amet',
        nonce: Math.floor(Math.random() * 1e6),
        createdAt: formatISO(new Date()),
        updatedAt: formatISO(new Date())
      })
      break

    default:
      res.setHeader('Allow', 'GET')
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}
