export interface User {
  uid: number
  role: string
  avatar: string
  address: string
  displayName: string
  bio?: string
  nonce?: number
  createdAt: string
  updatedAt: string
}
