export type UserType = {
  _id: string
  email: string
  username: string
  displayName: string
  avatar: string | null
  role: string
  isActivated: boolean
  createdAt: number
  updatedAt: number | null
}
