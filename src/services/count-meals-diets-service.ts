import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealsDietServiceRequest {
  userId: string
}

interface CountMealsDietServiceResponse {
  diets: number
}

export class CountMealsDietsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
  }: CountMealsDietServiceRequest): Promise<CountMealsDietServiceResponse> {
    const diets = await this.mealsRepository.countDietsByUserId(userId)

    return {
      diets,
    }
  }
}
