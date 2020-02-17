import * as utils from '@/utils'

export const genders = [
  { id: '0', name: 'その他' },
  { id: '1', name: '男性' },
  { id: '2', name: '女性' },
]

export type MemberStatistics = {  
  total: number,
  maleTotal: number,
  femaleTotal: number,
  numberOfHiresPerYear: object,
  populationByAge: object,
}

export type MemberResponse = {
  id: string
  name: string
  birthDate: number
  joinedDate: number
  gender: string
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
  name: string
  birthDate: number
  joinedDate: number
  gender: string
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
    member.name = res.name
    member.birthDate = res.birthDate
    member.joinedDate = res.joinedDate
    member.gender = res.gender
    member.specialty = res.specialty
    member.selfAppeal = res.selfAppeal
    member.departmentId = res.departmentId
    member.avatar = res.avatar
    member.deleted = res.deleted
    member.registeredDate = res.registeredDate
    member.modifiedDate = res.modifiedDate
    return member
  }

  get genderName() {
    return genders.filter(gender => gender.id === this.gender)[0].name  // 微妙
  }

  get formattedBirthDate() {
    return utils.convertUnixMillsToISODate(this.birthDate)
  }

  set formattedBirthDate(value) {
    this.birthDate = utils.convertISODateToUnixMills(value)
  }

  get formattedJoinedDate() {
    return utils.convertUnixMillsToISODate(this.joinedDate)
  }

  set formattedJoinedDate(value) {
    this.joinedDate = utils.convertISODateToUnixMills(value)
  }

  get formattedRegisteredDate() {
    return utils.convertUnixMillsToISODate(this.registeredDate)
  }

  get formattedModifiedDate() {
    return utils.convertUnixMillsToISODate(this.modifiedDate)
  }
}