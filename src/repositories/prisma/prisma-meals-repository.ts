import { prisma } from '@/lib/prisma'
import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findManyByUserId(userId: string): Promise<Meal[]> {
    return prisma.meal.findMany({ where: { user_id: userId } })
  }

  async findById(userId: string): Promise<Meal | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = prisma.meal.create({
      data,
    })

    return meal
  }
}
