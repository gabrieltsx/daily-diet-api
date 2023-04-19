import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

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
