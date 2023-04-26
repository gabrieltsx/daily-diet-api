import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MealsRepository } from '../meals-repository'
import { CoutDietGroupDateResponse } from '../prisma/prisma-meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async countIsDietByUserIdAndGroupByCreatedAt(
    userId: string,
  ): Promise<CoutDietGroupDateResponse[]> {
    throw new Error('Method not implemented.')
  }

  async countByUserId(userId: string) {
    const countMeals = this.items.filter(
      (item) => item.user_id === userId,
    ).length

    return countMeals
  }

  async countByUserIdAndDiet(userId: string, diet: boolean) {
    const countMeals = this.items.filter(
      (item) => item.user_id === userId && item.is_diet === diet,
    ).length

    return countMeals
  }

  async save(data: Meal): Promise<Meal> {
    const mealIndex = this.items.findIndex(
      (item) => item.id === data.id && item.user_id === data.user_id,
    )

    if (mealIndex >= 0) {
      this.items[mealIndex] = data
    }

    return data
  }

  async delete(mealId: string, userId: string): Promise<void> {
    const mealIndex = this.items.findIndex(
      (item) => item.id === mealId && item.user_id === userId,
    )

    this.items.splice(mealIndex, 1)
  }

  async findManyByUserId(userId: string): Promise<Meal[]> {
    return this.items.filter((item) => item.user_id === userId)
  }

  async findByMealIdAndUserId(
    mealId: string,
    userId: string,
  ): Promise<Meal | null> {
    const meal = this.items.find(
      (item) => item.id === mealId && item.user_id === userId,
    )

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
