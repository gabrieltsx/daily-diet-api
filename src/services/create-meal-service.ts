import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface CreateMealServiceRequest {
  name: string
  description: string
  createdAt: Date
  isDiet: boolean
  userId: string
}

interface CreateMealServiceResponse {
  meal: Meal
}

export class CreateMealService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    name,
    description,
    createdAt,
    isDiet,
    userId,
  }: CreateMealServiceRequest): Promise<CreateMealServiceResponse> {
    const meal = await this.mealsRepository.create({
      description,
      created_at: createdAt,
      name,
      is_diet: isDiet,
      user_id: userId,
    })

    return {
      meal,
    }
  }
}
