import { prisma } from '@/lib/prisma'
import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
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

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = prisma.meal.create({
      data,
    })

    return meal
  }
}
