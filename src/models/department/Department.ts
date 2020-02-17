import * as utils from '@/utils'

export type DepartmentResponse = {
  id: string
  name: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number
}

export class Department {
  id: string
  name: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number

  private constructor() {}

  static getInstance(res: DepartmentResponse): Department {
    const department = new Department()
    department.id = res.id
    department.name = res.name
    department.deleted = res.deleted
    department.registeredDate = res.registeredDate
    department.modifiedDate = res.modifiedDate
    return department
  }

  get formattedRegisteredDate() {
    return utils.convertUnixMillsToISODate(this.registeredDate)
  }

  get formattedModifiedDate() {
    return utils.convertUnixMillsToISODate(this.modifiedDate)
  }
}