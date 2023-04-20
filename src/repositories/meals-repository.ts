import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findManyByUserId(userId: string): Promise<Meal[]>
  findByMealIdAndUserId(mealId: string, userId: string): Promise<Meal | null>
}
