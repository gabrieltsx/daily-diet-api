import { prisma } from '@/lib/prisma'
import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async countByUserId(userId: string) {
    const countMeals = prisma.meal.count({
      where: {
        user_id: userId,
      },
    })

    return countMeals
  }

  async countByUserIdAndDiet(userId: string, isDiet: boolean) {
    const countMeals = prisma.meal.count({
      where: {
        user_id: userId,
        is_diet: isDiet,
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

  async delete(mealId: string, userId: string) {
    await prisma.meal.deleteMany({
      where: {
        id: mealId,
        user_id: userId,
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
