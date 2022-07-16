import { NextApiRequest, NextApiResponse } from 'next'
import { addHours, addDays, formatISO } from 'date-fns'
import { configs } from '@/constants'
import type { IRespToken } from '@/types'
import JWT from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse<IRespToken>) {
  switch (req.method) {
    case 'POST':
      // const { refreshToken } = req.body

      const accessToken = {
        payload: JWT.sign({ uid: 1, address: '0x0' }, configs.API_SECRET_KEY, { expiresIn: '1h' }),
        expiresAt: formatISO(addHours(new Date(), 1))
      }

      const refreshToken = {
        payload: JWT.sign({ uid: 1 }, configs.API_SECRET_KEY, { expiresIn: '7 days' }),
        expiresAt: formatISO(addDays(new Date(), 7))
      }

      res.status(200).json({
        tokenType: 'bearer',
        accessToken,
        refreshToken
      })
      break

    default:
      res.setHeader('Allow', 'POST')
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}
