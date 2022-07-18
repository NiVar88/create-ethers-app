import { NextApiRequest, NextApiResponse } from 'next'
import { readdirSync } from 'fs'
import { join } from 'path'
import ffmpeg from 'fluent-ffmpeg'
import { Store } from '@/utils/store'

const albums = new Store('albums', [])
const tracks = new Store('tracks', [])

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.json({ albums: albums.state, tracks: tracks.state })
      break

    case 'POST':
      let [__albums, __tracks]: [any[], any[]] = [[], []]
      const __dir = 'C:/Users/root/Downloads/1'

      const __dirSync = (path: string) => readdirSync(path, { withFileTypes: true })
      const __func = (path: string, f: 'isFile' | 'isDirectory') =>
        __dirSync(path)
          .filter((r) => r[f]())
          .map((r) => join(path, r.name))

      __albums = __dirSync(__dir)
        .filter((r) => r.isDirectory())
        .map((r) => {
          const path = join(__dir, r.name)
          return {
            id: Math.floor(Math.random() * 1e6),
            name: r.name,
            posters: __func(path, 'isFile'),
            directory: {
              base: path,
              episode: __func(path, 'isDirectory')
            }
          }
        })
      albums.setState(__albums)

      for (const album of __albums) {
        album.directory.episode.forEach((episodeDir: string) => {
          __dirSync(episodeDir).forEach((track) => {
            ffmpeg.ffprobe(join(episodeDir, track.name), (err, data) => {
              if (err) console.log(err)
              else {
                __tracks.push({
                  ...data.format,
                  streams: data.streams
                })
              }

              tracks.setState(__tracks)
            })
          })
        })
      }

      res.json({})
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}
