import { ReactNode } from 'react'
import { dispatch, appActions } from '@/Store'

export interface Notice {
  vid: string
  visible: boolean
  type: 'info' | 'success' | 'warn' | 'error'
  name?: string
  title: string
  content: ReactNode
  duration?: number
}

export type NoticeOptions = Omit<Notice, 'vid' | 'visible' | 'type'>

const defaultOptions = { visible: true, duration: 3e3 }

function setNotice(options: Omit<Notice, 'vid'>) {
  const vid = Math.random().toString(16).slice(2)
  const action = appActions.setNotice({ ...options, vid })
  dispatch(action)

  return vid
}

export class notice {
  static info(options: NoticeOptions) {
    return setNotice({
      type: 'info',
      ...defaultOptions,
      ...options
    })
  }

  static success(options: NoticeOptions) {
    return setNotice({
      type: 'success',
      ...defaultOptions,
      ...options
    })
  }

  static warn(options: NoticeOptions) {
    return setNotice({
      type: 'warn',
      ...defaultOptions,
      ...options
    })
  }

  static error(options: NoticeOptions) {
    return setNotice({
      type: 'error',
      ...defaultOptions,
      ...options
    })
  }

  static close(vid: string) {
    dispatch(
      appActions.setNotice({
        vid: `rm:${vid}`,
        visible: false,
        type: 'success',
        title: '',
        content: null
      })
    )
  }

  static clear() {
    dispatch(appActions.setNotice(null))
  }
}
