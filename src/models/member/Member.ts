export type MemberResponse = {
  id: string
  code: string
  name: string
  birthDate: number
  specialty: string
  selfAppeal: string
  departmentId: string
  avatar: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number
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
  deleted: boolean
  registeredDate: number
  modifiedDate: number

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
    member.deleted = res.deleted
    member.registeredDate = res.registeredDate
    member.modifiedDate = res.modifiedDate
    return member
  }

  get formattedBirthDate() {
    return new Date(this.birthDate).toISOString().slice(0,10)
  }

  get formattedRegisteredDate() {
    return new Date(this.registeredDate).toISOString().slice(0,10)
  }

  get formattedModifiedDate() {
    return new Date(this.modifiedDate).toISOString().slice(0,10)
  }
}