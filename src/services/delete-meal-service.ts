import { MealsRepository } from '@/repositories/meals-repository'

interface DeleteMealServiceRequest {
  mealId: string
  userId: string
}

export class DeleteMealService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({ mealId, userId }: DeleteMealServiceRequest): Promise<void> {
    this.mealsRepository.delete(mealId, userId)
  }
}
