export type MemberResponse = {
  id: string
  code: string
  name: string
  birthDate: number
  specialty: string
  selfAppeal: string
  departmentId: string
  avatar: string
  modifiedDate: number
  deleted: boolean
}

export class Member {
  id: string
  code: string
  name: string
  birthDate: number
  specialty: string
  selfAppeal: string
  departmentId: string
  avatar: string
  modifiedDate: number
  deleted: boolean

  private constructor() {}

  static getInstance(res: MemberResponse): Member {
    const member = new Member()
    member.id = res.id
    member.code = res.code
    member.name = res.name
    member.birthDate = res.birthDate
    member.specialty = res.specialty
    member.selfAppeal = res.selfAppeal
    member.departmentId = res.departmentId
    member.avatar = res.avatar
    member.modifiedDate = res.modifiedDate
    member.deleted = res.deleted
    return member
  }

  get formattedBirthDate() {
    return new Date(this.birthDate).toISOString().slice(0,10)
  }
}