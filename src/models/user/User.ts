export type UserResponse = {
  id: string
  code: string
  name: string  
  role: string
  password: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number
}

export class User {
  id: string
  code: string
  name: string  
  role: string
  password: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number

  private constructor() {}

  static getInstance(res: UserResponse): User {
    const user = new User()
    user.id = res.id
    user.code = res.code
    user.name = res.name
    user.role = res.role
    user.password = res.password
    user.deleted = res.deleted
    user.registeredDate = res.registeredDate
    user.modifiedDate = res.modifiedDate
    return user
  }
}