export type Statistics = {
  numbersOfEmployments: Array<NumberOfEmployment>,
  numbersOfRetirements: Array<NumberOfRetirement>,
  memberStastics: MemberStastics,
}

export type NumberOfEmployment = {
  year: number,
  total: number,
}

export type NumberOfRetirement = {
  year: number,
  total: number,
}

type MemberStastics = {
  total: number,
  maleTotal: number,
  femaleTotal: number,
  newGraduates: number,
  midCareers: number,
  populationByAge: object,
}
