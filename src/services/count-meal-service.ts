import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealsServiceRequest {
  userId: string
}

interface CountMealsServiceResponse {
  coutMeals: number
}

export class CountMealsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
  }: CountMealsServiceRequest): Promise<CountMealsServiceResponse> {
    const coutMeals = await this.mealsRepository.countByUserId(userId)

    return {
      coutMeals,
    }
  }
}
