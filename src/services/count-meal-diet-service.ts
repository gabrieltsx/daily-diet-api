import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealsDietServiceRequest {
  userId: string
  isDiet: boolean
}

interface CountMealsDietServiceResponse {
  coutMeals: number
}

export class CountMealsDietService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
    isDiet,
  }: CountMealsDietServiceRequest): Promise<CountMealsDietServiceResponse> {
    const coutMeals = await this.mealsRepository.countByUserIdAndDiet(
      userId,
      isDiet,
    )

    return {
      coutMeals,
    }
  }
}
