import axios from '@/plugins/axios'
import {Team, TeamResponse} from '@/models/team/Team'
import uuidv4 from 'uuid/v4'

export default {
  newInstance(): Team {
    return Team.getInstance({
      id: uuidv4(),
      name: '',
      leaderId: '',
      deleted: false,
      registeredDate: 0,
      modifiedDate: 0,
    })
  },

  async search(): Promise<Array<Team>> {
    const res = await axios.get('/teams')
    return res.data.map((e: TeamResponse) => Team.getInstance(e))
  },

  async select(id: String): Promise<Team> {
    const res = await axios.get(`/teams/${id}`)
    return Team.getInstance(res.data)
  },

  async getNameMap(): Promise<Map<string, string>> {
    const teams = await this.search() 
    return new Map(teams.map(team => [team.id, team.name]))
  },

  async register(team: Team) {
    await axios.post(`/teams`, team)
  },

  async update(team: Team) {
    await axios.put(`/teams`, team)
  },

  async remove(team: Team) {
    team.deleted = true
    await axios.put(`/teams`, team)
  }
}