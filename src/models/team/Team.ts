import * as utils from '@/utils'

export type TeamResponse = {
  id: string
  name: string
  leaderId: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number
}

export class Team {
  id: string
  name: string
  leaderId: string
  leaderName: string
  deleted: boolean
  registeredDate: number
  modifiedDate: number

  private constructor() {}

  static getInstance(res: TeamResponse): Team {
    const team = new Team()
    team.id = res.id
    team.name = res.name
    team.leaderId = res.leaderId
    team.deleted = res.deleted
    team.registeredDate = res.registeredDate
    team.modifiedDate = res.modifiedDate
    return team
  }

  get formattedRegisteredDate() {
    return utils.convertUnixMillsToISODate(this.registeredDate)
  }

  get formattedModifiedDate() {
    return utils.convertUnixMillsToISODate(this.modifiedDate)
  }
}