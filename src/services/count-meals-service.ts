import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealsServiceRequest {
  userId: string
}

interface CountMealsServiceResponse {
  countMeals: number
}

export class CountMealsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
  }: CountMealsServiceRequest): Promise<CountMealsServiceResponse> {
    const countMeals = await this.mealsRepository.countByUserId(userId)

    return {
      countMeals,
    }
  }
}
