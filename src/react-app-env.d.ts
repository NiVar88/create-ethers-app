/// <reference types="react-scripts" />

declare interface Array<T = any> {
  findOne: (prop: keyof T, value: string | number | boolean) => T
  findAll: (prop: keyof T, value: string | number | boolean) => T[]
  remove: (prop: keyof T, value: string | number | boolean) => T[]
  groupBy: (prop: keyof T) => T
  orderBy: (prop: keyof T, type?: string) => T[]
}

declare module '*.json'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.webp'
