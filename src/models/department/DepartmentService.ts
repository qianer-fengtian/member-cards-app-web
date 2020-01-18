import axios from '@/plugins/axios'
import {Department, DepartmentResponse} from '@/models/department/Department'
import uuidv4 from 'uuid/v4'

export default {
  newInstance(): Department {
    return Department.getInstance({
      id: uuidv4(),
      code: '',
      name: '',
      deleted: false,
      registeredDate: 0,
      modifiedDate: 0,
    })
  },

  async search(): Promise<Array<Department>> {
    const res = await axios.get('/departments')
    return res.data.map((e: DepartmentResponse) => Department.getInstance(e))
  },

  async select(id: String): Promise<Department> {
    const res = await axios.get(`/departments/${id}`)
    return Department.getInstance(res.data)
  },

  async register(department: Department) {
    await axios.post(`/departments`, department)
  },

  async update(department: Department) {
    await axios.put(`/departments`, department)
  },

  async remove(department: Department) {
    department.deleted = true
    await axios.put(`/departments`, department)
  }
}