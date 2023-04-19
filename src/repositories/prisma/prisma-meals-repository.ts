import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = prisma.meal.create({
      data,
    })

    return meal
  }
}
