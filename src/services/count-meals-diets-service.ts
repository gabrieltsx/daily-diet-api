import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealsDietServiceRequest {
  userId: string
  isDiet: boolean
}

interface CountMealsDietServiceResponse {
  countMeals: number
}

export class CountMealsDietsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
    isDiet,
  }: CountMealsDietServiceRequest): Promise<CountMealsDietServiceResponse> {
    const countMeals = await this.mealsRepository.countByUserIdAndDiet(
      userId,
      isDiet,
    )

    return {
      countMeals,
    }
  }
}
