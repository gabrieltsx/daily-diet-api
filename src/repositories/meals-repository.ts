import { Meal, Prisma } from '@prisma/client'
import { CoutDietGroupDateResponse } from './prisma/prisma-meals-repository'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findManyByUserId(userId: string): Promise<Meal[]>
  findByMealIdAndUserId(mealId: string, userId: string): Promise<Meal | null>
  delete(mealId: string, userId: string): Promise<void>
  save(data: Meal): Promise<Meal>
  countByUserId(userId: string): Promise<number>
  countByUserIdAndDiet(userId: string, diet: boolean): Promise<number>
  countIsDietByUserIdAndGroupByCreatedAt(
    userId: string,
  ): Promise<CoutDietGroupDateResponse[]>
}
