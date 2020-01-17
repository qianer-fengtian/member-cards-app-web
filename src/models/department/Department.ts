export type DepartmentResponse = {
  id: string
  name: string
  modifiedDate: number
  deleted: boolean
}

export class Department {
  id: string
  name: string
  modifiedDate: number
  deleted: boolean

  private constructor() {}

  static getInstance(res: DepartmentResponse): Department {
    const department = new Department()
    department.id = res.id
    department.name = res.name
    department.modifiedDate = res.modifiedDate
    department.deleted = res.deleted
    return department
  }
}