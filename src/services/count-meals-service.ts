import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealsServiceRequest {
  userId: string
}

interface CountMealsServiceResponse {
  meals: number
}

export class CountMealsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
  }: CountMealsServiceRequest): Promise<CountMealsServiceResponse> {
    const meals = await this.mealsRepository.countByUserId(userId)

    return {
      meals,
    }
  }
}
