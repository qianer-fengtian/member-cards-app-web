type StatisticsResponse = {
  numbersOfEmployments: Array<NumberOfEmployment>,
  numbersOfRetirements: Array<NumberOfRetirement>,
  memberStastics: MemberStastics,
}

type NumberOfEmploymentResponse = {
  year: number,
  total: number,
}

type NumberOfRetirementResponse = {
  year: number,
  total: number,
}

type MemberStasticsResponse = {
  total: number,
  maleTotal: number,
  femaleTotal: number,
  newGraduates: number,
  midCareers: number,
  populationByAge: object,
}

export class NumberOfEmployment {
  year: number
  total: number

  private constructor() {}

  static getInstance(res: NumberOfEmploymentResponse) {
    const numberOfEmployment = new NumberOfEmployment()
    numberOfEmployment.year = res.year
    numberOfEmployment.total = res.total
    return numberOfEmployment
  }
}

export class NumberOfRetirement {
  year: number
  total: number

  private constructor() {}

  static getInstance(res: NumberOfRetirementResponse) {
    const numberOfRetirement = new NumberOfRetirement()
    numberOfRetirement.year = res.year
    numberOfRetirement.total = res.total
    return numberOfRetirement
  }
}

export class MemberStastics {
  total: number
  maleTotal: number
  femaleTotal: number
  newGraduates: number
  midCareers: number
  populationByAge: object

  private constructor() {}

  static getInstance(res: MemberStasticsResponse) {
    const memberStatistics = new MemberStastics()
    memberStatistics.total = res.total
    memberStatistics.maleTotal = res.maleTotal
    memberStatistics.femaleTotal = res.femaleTotal
    memberStatistics.newGraduates = res.newGraduates
    memberStatistics.midCareers = res.midCareers
    memberStatistics.populationByAge = res.populationByAge
    return memberStatistics
  }
}

export class Statistics {
  numbersOfEmployments: Array<NumberOfEmployment>
  numbersOfRetirements: Array<NumberOfRetirement>
  memberStastics: MemberStastics

  private constructor() {}

  static getInstance(res: StatisticsResponse): Statistics {
    const statistics = new Statistics()

    statistics.numbersOfEmployments = res.numbersOfEmployments.map(e => NumberOfEmployment.getInstance(e))
    statistics.numbersOfRetirements = res.numbersOfRetirements.map(e => NumberOfRetirement.getInstance(e))
    statistics.memberStastics = MemberStastics.getInstance(res.memberStastics)

    return statistics
  }

  get total() {
    return this.memberStastics.total
  }
  
  get maleTotal() {
    return this.memberStastics.maleTotal
  }

  get femaleTotal() {
    return this.memberStastics.femaleTotal
  }

  get newGraduates() {
    return this.memberStastics.newGraduates
  }

  get midCareers() {
    return this.memberStastics.midCareers
  }

  get populationByAge() {
    return this.memberStastics.populationByAge
  }

  get averageAge() {
    if (Object.keys(this.memberStastics.populationByAge).length === 0) return 0
    const averageAge = Object.keys(this.memberStastics.populationByAge).map(e => +e).reduce((a, b) => a + b, 0) / Object.keys(this.memberStastics.populationByAge).length
    return Math.round(averageAge)
  }
  
  get maleRatio() {
    if (this.memberStastics.total <= 0) return 0
    return (this.memberStastics.maleTotal / this.maleFemaleTotal) * 100
  }

  private get maleFemaleTotal() {
    return this.memberStastics.maleTotal + this.memberStastics.femaleTotal;
  }

  get joinedTotal() {
    return this.numbersOfEmployments.map(e => e.total).reduce((a, b) => a + b, 0)
  }

  get leftTotal() {
    return this.numbersOfRetirements.map(e => e.total).reduce((a, b) => a + b, 0)
  }

  get lastThreeYearsJoinedTotal(): number {
    return this.numbersOfEmployments.slice(this.lastYears).map(e => e.total).reduce((a, b) => a + b, 0)    
  }

  get lastThreeYearsLeftTotal(): number {
    return this.numbersOfRetirements.slice(this.lastYears).map(e => e.total).reduce((a, b) => a + b, 0)
  }

  private get lastYears(): number {
    return this.numbersOfEmployments.length - Math.min(this.numbersOfEmployments.length, 2)
  }
}
