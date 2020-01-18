import axios from '@/plugins/axios'
import {Member, MemberResponse} from '@/models/member/Member'
import uuidv4 from 'uuid/v4'

export default {
  newInstance(): Member {
    return Member.getInstance({
      id: uuidv4(),
      code: '',
      name: '',
      avatar: '',
      birthDate: 0,
      specialty: '',
      selfAppeal: '',
      departmentId: '',
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