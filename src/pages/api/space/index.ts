import { NextApiRequest, NextApiResponse } from 'next'
import { readdirSync } from 'fs'
import { join } from 'path'
import { ffprobe } from 'fluent-ffmpeg'
import type { FfprobeData } from 'fluent-ffmpeg'
import { Store } from '@/utils/store'
import { generateId } from '@/utils'

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

const albums = new Store('albums', [] as IAlbum[])
const tracks = new Store('tracks', [] as ITrack[])

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.json({
        albums: albums.state,
        tracks: tracks.state
      })
      break

    case 'POST':
      const { rootDir } = req.body
      let [__albums, __tracks]: [IAlbum[], ITrack[]] = [[], []]

      const __dirSync = (path: string) => readdirSync(path, { withFileTypes: true })
      const __func = (path: string, f: 'isFile' | 'isDirectory') =>
        __dirSync(path)
          .filter((r) => r[f]())
          .map((r) => join(path, r.name))

      __albums = __dirSync(rootDir)
        .filter((r) => r.isDirectory())
        .map((r) => {
          let path = join(rootDir, r.name)
          return {
            id: generateId(),
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

      res.json({
        albums: albums.state,
        tracks: tracks.state
      })
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
