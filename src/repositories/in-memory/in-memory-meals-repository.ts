import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findManyByUserId(userId: string): Promise<Meal[]> {
    return this.items.filter((item) => item.id === userId)
  }

  async findByMealIdAndUserId(
    mealId: string,
    userId: string,
  ): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id === userId)

    if (!meal) {
      return null
    }

    return meal
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = {
      id: randomUUID(),
      description: data.description,
      name: data.name,
      created_at: data.created_at,
      is_diet: data.is_diet,
      user_id: data.user_id,
    } as Meal

    this.items.push(meal)

    return meal
  }
}
