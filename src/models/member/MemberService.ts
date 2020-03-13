import axios from '@/plugins/axios'
import {Member, MemberResponse, MemberStatistics} from '@/models/member/Member'
import uuidv4 from 'uuid/v4'

export default {
  newInstance(): Member {
    return Member.getInstance({
      id: uuidv4(),
      name: '',
      avatar: '',
      birthDate: 0,
      joinedDate: Date.now(),
      leftDate: null,
      gender: '0',
      specialty: '',
      selfAppeal: '',
      departmentId: '',
      departmentName: '',
      teamId: '',
      teamName: '',
      joiningId: uuidv4(),
      joiningForm: '0',
      deleted: false,
      registeredDate: 0,
      modifiedDate: 0,
    })
  },

  async search(): Promise<Array<Member>> {
    const res = await axios.get("/members")
    return res.data.map((e: MemberResponse) => Member.getInstance(e))
  },

  async select(id: String): Promise<Member> {
    const res = await axios.get(`/members/${id}`)
    return Member.getInstance(res.data)
  },

  async getNameMap(): Promise<Map<string, string>> {
    const members = await this.search() 
    return new Map(members.map(member => [member.id, member.name]))
  },

  async register(member: Member) {
    await axios.post('members', member)
  },

  async update(member: any) {
    await axios.put('/members', member)
  },

  async remove(member: any) {
    member.deleted = true
    await axios.put('/members', member)
  }
}