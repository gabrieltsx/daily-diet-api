import { prisma } from '@/lib/prisma'
import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export interface CoutDietGroupDateResponse {
  day: Date
  count_diet: BigInt
}

export class PrismaMealsRepository implements MealsRepository {
  async countIsDietByUserIdAndGroupByCreatedAt(userId: string) {
    const mealsGroup = await prisma.$queryRaw<CoutDietGroupDateResponse[]>`
      SELECT DATE(created_at) AS day, COUNT (*) AS count_diet
        FROM meals
       WHERE user_id = ${userId}
         AND is_diet = true
    GROUP BY DATE(created_at)
    ORDER BY count_diet DESC
    `

    return mealsGroup
  }

  async countByUserId(userId: string) {
    const countMeals = prisma.meal.count({
      where: {
        user_id: userId,
      },
    })

    return countMeals
  }

  async countDietsByUserId(userId: string) {
    const countMeals = prisma.meal.count({
      where: {
        user_id: userId,
        is_diet: true,
      },
    })

    return countMeals
  }

  async countNotDietsByUserId(userId: string) {
    const countMeals = prisma.meal.count({
      where: {
        user_id: userId,
        is_diet: false,
      },
    })

    return countMeals
  }

  async save(data: Prisma.MealUncheckedCreateInput) {
    const meal = prisma.meal.update({
      where: {
        id: data.id,
      },
      data,
    })

    return meal
  }

  async delete(mealId: string) {
    await prisma.meal.delete({
      where: {
        id: mealId,
      },
    })
  }

  async findManyByUserId(userId: string): Promise<Meal[]> {
    return prisma.meal.findMany({ where: { user_id: userId } })
  }

  async findByMealIdAndUserId(
    mealId: string,
    userId: string,
  ): Promise<Meal | null> {
    const meal = prisma.meal.findFirst({
      where: {
        id: mealId,
        user_id: userId,
      },
    })

    if (!meal) {
      return null
    }

    return meal
  }

  async create(data: Meal) {
    const meal = prisma.meal.create({
      data,
    })

    return meal
  }
}
