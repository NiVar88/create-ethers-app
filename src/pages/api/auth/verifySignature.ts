import { NextApiRequest, NextApiResponse } from 'next'
import { addHours, addDays, formatISO } from 'date-fns'
import { configs } from '@/constants'
import type { ISignatureParams, IRespToken } from '@/types'
import JWT from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse<IRespToken>) {
  switch (req.method) {
    case 'POST':
      const { address }: ISignatureParams = req.body

      const accessToken = {
        payload: JWT.sign({ uid: 1, address }, configs.API_SECRET_KEY, { expiresIn: '1h' }),
        expiresAt: formatISO(addHours(new Date(), 1))
      }

      const refreshToken = {
        payload: JWT.sign({ uid: 1 }, configs.API_SECRET_KEY, { expiresIn: '7 days' }),
        expiresAt: formatISO(addDays(new Date(), 7))
      }

      res.status(200)
      res.json({
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
