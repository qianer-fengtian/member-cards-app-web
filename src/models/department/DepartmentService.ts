import {Department, DepartmentResponse} from '@/models/department/Department'
import uuidv4 from 'uuid/v4'

export default {
  newInstance(): Department {
    return Department.getInstance({
      id: uuidv4(),
      name: '',
      modifiedDate: 0,
      deleted: false,
    })
  },

  async search(): Promise<Array<Department>> {
    const res = await fetch('http://localhost:8080/departments')
    const data = await res.json()
    return data.map((e: DepartmentResponse) => Department.getInstance(e))
  },

  async select(id: String): Promise<Department> {
    const res = await fetch(`http://localhost:8080/departments/${id}`)
    const data = await res.json()
    return data
  },

  async register(department: Department): Promise<Department> {
    const res = await fetch(`http://localhost:8080/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(department)
    })
    const data = await res.json()
    return data
  },

  async update(department: Department): Promise<Department> {
    const res = await fetch(`http://localhost:8080/departments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(department)
    })
    const data = await res.json()
    return data
  },

  async remove(department: Department): Promise<Department> {
    department.deleted = true
    const res = await fetch(`http://localhost:8080/departments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(department)
    })
    const data = await res.json()
    return data
  }
}