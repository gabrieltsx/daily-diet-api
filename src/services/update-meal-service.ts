import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface MealRequest {
  name: string
  description: string
  isDiet: boolean
}

interface UpdateMealServiceRequest {
  mealId: string
  userId: string
  newMeal: MealRequest
}

interface UpdateMealServiceResponse {
  meal: Meal
}

export class UpdateMealService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    mealId,
    userId,
    newMeal,
  }: UpdateMealServiceRequest): Promise<UpdateMealServiceResponse> {
    const meal = await this.mealsRepository.findByMealIdAndUserId(
      mealId,
      userId,
    )

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    meal.name = newMeal.name
    meal.description = newMeal.description
    meal.is_diet = newMeal.isDiet

    await this.mealsRepository.save(meal)

    return {
      meal,
    }
  }
}
