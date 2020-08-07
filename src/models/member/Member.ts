import * as utils from '@/utils'

export const genders = [
  { id: '0', name: 'その他' },
  { id: '1', name: '男性' },
  { id: '2', name: '女性' },
]

export const joiningForms = [
  { id: '0', name: '新卒採用' },
  { id: '1', name: '中途採用' },
  { id: '9', name: 'その他' },
]

export type MemberStatistics = {  
  total: number,
  maleTotal: number,
  femaleTotal: number,
  numberOfJoinedPerYear: object,
  numberOfLeftPerYear: object,
  populationByAge: object,
}

export type MemberResponse = {
  id: string
  name: string
  birthDate: number
  joinedDate: number
  leftDate: number | null
  gender: string
  specialty: string
  selfAppeal: string
  departmentId: string
  departmentName: string
  teamId: string
  teamName: string
  joiningId: string
  joiningForm: string
  avatar: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number
}

export type MemberAvatarResponse = {
  id: string
  leftDate: number | null
  avatar: string
  deleted: boolean
}

export class MemberAvatar {
  id: string
  leftDate: number | null
  avatar: string
  deleted: boolean

  private constructor() {}

  static getInstance(res: MemberAvatarResponse): MemberAvatar {
    const memberAvatar = new MemberAvatar()
    memberAvatar.id = res.id
    memberAvatar.leftDate = res.leftDate
    memberAvatar.avatar = res.avatar
    return memberAvatar
  }
}

export class Member {
  id: string
  name: string
  birthDate: number
  joinedDate: number
  leftDate: number | null
  gender: string
  specialty: string
  selfAppeal: string
  departmentId: string
  departmentName: string
  teamId: string
  teamName: string
  joiningId: string
  joiningForm: string
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
    member.leftDate = res.leftDate
    member.gender = res.gender
    member.specialty = res.specialty
    member.selfAppeal = res.selfAppeal
    member.departmentId = res.departmentId
    member.departmentName = res.departmentName
    member.teamId = res.teamId
    member.teamName = res.teamName
    member.joiningId = res.joiningId
    member.joiningForm = res.joiningForm
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

  get formattedLeftDate() {
    if (!this.leftDate) return ''
    return utils.convertUnixMillsToISODate(this.leftDate)
  }

  set formattedLeftDate(value) {
    this.leftDate = value ? utils.convertISODateToUnixMills(value) : null
  }

  get formattedRegisteredDate() {
    return utils.convertUnixMillsToISODate(this.registeredDate)
  }

  get formattedModifiedDate() {
    return utils.convertUnixMillsToISODate(this.modifiedDate)
  }
}