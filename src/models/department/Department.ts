export type DepartmentResponse = {
  id: string
  code: string
  name: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number
}

export class Department {
  id: string
  code: string
  name: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number

  private constructor() {}

  static getInstance(res: DepartmentResponse): Department {
    const department = new Department()
    department.id = res.id
    department.code = res.code
    department.name = res.name
    department.deleted = res.deleted
    department.registeredDate = res.registeredDate
    department.modifiedDate = res.modifiedDate
    return department
  }
}