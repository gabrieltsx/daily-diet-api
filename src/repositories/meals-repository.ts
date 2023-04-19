import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findManyByUserId(userId: string): Promise<Meal[]>
  findById(userId: string): Promise<Meal | null>
}
