import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealsDietServiceRequest {
  userId: string
}

interface CountMealsDietServiceResponse {
  countDietsResponse: {
    day: Date
    countDiet: number
  }[]
}

export class CountDietsByCreatedAtService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
  }: CountMealsDietServiceRequest): Promise<CountMealsDietServiceResponse> {
    const countDietsReturn =
      await this.mealsRepository.countIsDietByUserIdAndGroupByCreatedAt(userId)

    const countDietsResponse = countDietsReturn.map((diets) => {
      return {
        day: diets.day,
        countDiet: Number(diets.count_diet),
      }
    })

    return {
      countDietsResponse,
    }
  }
}
