import axios from '@/plugins/axios'
import { Statistics, MemberStastics } from '@/models/statistics/Statistics'

export default {
  newInstance(): Statistics {
    return Statistics.getInstance({
      numbersOfEmployments: [],
      numbersOfRetirements: [],
      memberStastics: MemberStastics.getInstance({
        total: 0,
        maleTotal: 0,
        femaleTotal: 0,
        newGraduates: 0,
        midCareers: 0,
        populationByAge: [],
      })
    })
  },

  async getAll(): Promise<Statistics> {
    const res = await axios.get("/statistics")
    return Statistics.getInstance(res.data)
  },
}