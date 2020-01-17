import {Member, MemberResponse} from '@/models/member/Member'
import uuidv4 from 'uuid/v4'

export default {
  newInstance(): Member {
    return Member.getInstance({
      id: uuidv4(),
      code: '',
      name: '',
      birthDate: 0,
      specialty: '',
      selfAppeal: '',
      departmentId: '',
      avatar: '',
      modifiedDate: 0,
      deleted: false,
    })
  },

  async search(): Promise<Array<Member>> {
    const res = await fetch('http://localhost:8080/members')
    const data = await res.json()
    return data.map((e: MemberResponse) => Member.getInstance(e))
  },

  async select(id: String): Promise<Member> {
    const res = await fetch(`http://localhost:8080/members/${id}`)
    const data = await res.json()
    return data
  },

  async register(member: Member): Promise<Member> {
    const res = await fetch(`http://localhost:8080/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(member)
    })
    const data = await res.json()
    return data
  },

  async update(member: any): Promise<Member> {
    const res = await fetch(`http://localhost:8080/members`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(member)
    })
    const data = await res.json()
    return data
  },

  async remove(member: any): Promise<Member> {
    member.deleted = true
    const res = await fetch(`http://localhost:8080/members`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(member)
    })
    const data = await res.json()
    return data
  }
}