export interface APIResponse<T> {
  message: string
  statusCode: number
  success: boolean
  data: T
}
export type Image = {
  localPath: string
  url: string
  _id: string
}
export type User = {
  __v: number
  _id: string
  avatar: Image
  createdAt: string
  email: string
  isEmailVerified: boolean
  // loginType: EMAIL_PASSWORD,
  role: 'ADMIN' | 'USER'
  updatedAt: string
  username: string
}

export type Error = {
  errors?: Record<string, string[]>
  statusCode: number
  message: string
  success: boolean
}
