import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface FetchMealsServiceRequest {
  userId: string
}

interface FetchMealsServiceResponse {
  meals: Meal[]
}

export class FetchMealsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
  }: FetchMealsServiceRequest): Promise<FetchMealsServiceResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId)

    return {
      meals,
    }
  }
}
