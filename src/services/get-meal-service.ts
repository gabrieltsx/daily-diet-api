import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetMealServiceRequest {
  mealId: string
  userId: string
}

interface GetMealServiceResponse {
  meal: Meal
}

export class GetMealService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    mealId,
    userId,
  }: GetMealServiceRequest): Promise<GetMealServiceResponse> {
    const meal = await this.mealsRepository.findByMealIdAndUserId(
      mealId,
      userId,
    )

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return {
      meal,
    }
  }
}
