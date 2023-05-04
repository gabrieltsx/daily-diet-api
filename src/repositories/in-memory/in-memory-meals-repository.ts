import { Meal, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { MealsRepository } from '../meals-repository'
import { CoutDietGroupDateResponse } from '../prisma/prisma-meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []
  public itemsGroupByCreatedAt: CoutDietGroupDateResponse[] = []

  async countIsDietByUserIdAndGroupByCreatedAt(
    userId: string,
  ): Promise<CoutDietGroupDateResponse[]> {
    const itemsIsDiet = this.items.filter(
      (item) => item.id === userId && item.is_diet === true,
    )
  }

  async countByUserId(userId: string) {
    const countMeals = this.items.filter(
      (item) => item.user_id === userId,
    ).length

    return countMeals
  }

  async countDietsByUserId(userId: string) {
    const countMeals = this.items.filter(
      (item) => item.user_id === userId && item.is_diet === true,
    ).length

    return countMeals
  }

  async countNotDietsByUserId(userId: string) {
    const countMeals = this.items.filter(
      (item) => item.user_id === userId && item.is_diet === false,
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

  async delete(mealId: string): Promise<void> {
    const mealIndex = this.items.findIndex((item) => item.id === mealId)

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
