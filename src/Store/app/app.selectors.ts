import { StoreTypes } from '@/Store'

export function getAppVersion({ app: { appVersion } }: StoreTypes) {
  return appVersion
}

export function getLanguage({ app: { lang } }: StoreTypes) {
  return lang
}

export function getTheme({ app: { theme } }: StoreTypes) {
  return theme
}

export function getLoader({ app: { loader } }: StoreTypes) {
  return loader
}

export function getDialog({ app: { dialog } }: StoreTypes) {
  return dialog
}

export function getModal({ app: { modal } }: StoreTypes) {
  return modal
}

export function getNotice({ app: { notice } }: StoreTypes) {
  return notice
}
