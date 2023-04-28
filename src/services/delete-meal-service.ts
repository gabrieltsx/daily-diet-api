import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteMealServiceRequest {
  mealId: string
  userId: string
}

export class DeleteMealService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({ mealId, userId }: DeleteMealServiceRequest): Promise<void> {
    const meal = await this.mealsRepository.findByMealIdAndUserId(
      mealId,
      userId,
    )

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(mealId)
  }
}
