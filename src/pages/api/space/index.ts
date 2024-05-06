import { NextApiRequest, NextApiResponse } from 'next'
import { constants, copyFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { ffprobe } from 'fluent-ffmpeg'
import type { FfprobeData } from 'fluent-ffmpeg'
import { Store } from '@/utils/store'
import { generateId } from '@/utils'

interface IQuery {
  album?: any
  track?: any
}

interface IBody {
  rootDir: string
  ignoreDir?: string[]
}

interface IAlbum {
  id: string
  name: string
  posters: string[]
  directory: {
    base: string
    episode: string[]
  }
}

interface ITrack {
  id: string
  albumId: string
  fileName?: string
  codecName?: string
  codecLongName?: string
  codecType?: string
  codecTagString?: string
  codecTag?: string
  encoder?: string
  pixFmt?: string
  width?: number
  height?: number
  size?: number
  duration?: number
  timeBase?: string
  bitRate?: number
  frameRate?: string
  aspectRatio?: string
  createdAt?: string | number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const albums = new Store('albums', [] as IAlbum[])
  const tracks = new Store('tracks', [] as ITrack[])

  switch (req.method) {
    case 'GET':
      const { album, track }: IQuery = req.query

      if (album && track)
        res.json({
          albums: albums.getState(),
          tracks: tracks.getState()
        })
      else if (album) res.json(albums.getState())
      else if (track) res.json(tracks.getState())
      else res.json([])
      break

    case 'POST':
      const { rootDir, ignoreDir }: IBody = req.body
      let [__albums, __tracks]: [IAlbum[], ITrack[]] = [[], []]

      if (!rootDir) {
        res.status(400)
        res.json({ error: 'Parameter `rootDir` is required.' })
        return void 0
      }

      const __dirSync = (path: string) => readdirSync(path, { withFileTypes: true })

      __albums = __dirSync(rootDir)
        .filter((r) => r.isDirectory() && ignoreDir && ignoreDir.indexOf(r.name) < 0)
        .map((r) => {
          let path = join(rootDir, r.name)
          let id = generateId()
          let posters = __dirSync(path)
            .filter((poster) => poster.isFile() && poster.name.match(/.jpg|.png/gi))
            .map(({ name }) => {
              let source = join(path, name)
              let target = `static/media/posters/${id}.${name.split('.')[1]}`

              copyFileSync(source, `public/${target}`, constants.COPYFILE_EXCL)
              return `/${target}`
            })

          return {
            id,
            name: r.name,
            posters,
            directory: {
              base: path,
              episode: __dirSync(path)
                .filter((r) => r.isDirectory())
                .map((r) => join(path, r.name))
            }
          }
        })
      albums.setState(__albums)

      for await (const album of __albums) {
        album.directory.episode.forEach((episodeDir: string) => {
          __dirSync(episodeDir).forEach((track) => {
            ffprobe(join(episodeDir, track.name), (err, data) => {
              if (err) console.log(err)
              else {
                __tracks.push(trackToDto(album.id, data))
                tracks.setState(__tracks)
              }
            })
          })
        })
      }

      res.status(201)
      res.send('Update success.')
      break

    case 'DELETE':
      albums.clear()
      tracks.clear()

      res.end('Deleted')
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}

export function trackToDto(albumId: string, { format, streams }: FfprobeData): ITrack {
  return {
    id: generateId(),
    albumId,
    fileName: format.filename,
    codecName: streams[0].codec_name,
    codecLongName: streams[0].codec_long_name,
    codecType: streams[0].codec_type,
    codecTagString: streams[0].codec_tag_string,
    codecTag: streams[0].codec_tag,
    pixFmt: streams[0].pix_fmt,
    width: streams[0].width,
    height: streams[0].height,
    size: format.size,
    duration: format.duration,
    timeBase: streams[0].time_base,
    bitRate: format.bit_rate,
    frameRate: streams[0].avg_frame_rate,
    aspectRatio: streams[0].display_aspect_ratio || streams[0].sample_aspect_ratio,
    createdAt: format.tags?.creation_time
  }
}
