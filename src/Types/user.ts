export interface User {
  uid: number
  role: string
  avatar: string
  address: string
  name: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface IUser {
  id: number
  address: string
  role: string
  updatedAt: string
  createdAt: string
}
