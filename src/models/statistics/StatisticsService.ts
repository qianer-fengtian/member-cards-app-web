import axios from '@/plugins/axios'
import { Statistics } from '@/models/statistics/Statistics'

export default {
  async getAll(): Promise<Statistics> {
    const res = await axios.get("/statistics")
    return res.data
  },
}