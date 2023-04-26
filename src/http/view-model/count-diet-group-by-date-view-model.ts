import { CoutDietGroupDateResponse } from '@/repositories/prisma/prisma-meals-repository'

export class CoutDietsGroupByDateViewModel {
  static toHTTP(coutDietGroupDateResponse: CoutDietGroupDateResponse) {
    return {
      day: coutDietGroupDateResponse.day,
      countDiet: Number(coutDietGroupDateResponse.count_diet),
    }
  }
}
