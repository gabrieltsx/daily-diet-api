import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { GetMealService } from './get-meal-service'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealService

describe('Get Meal Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealService(mealsRepository)
  })

  it('should be able to fetch meals', async () => {
    const mealCreated = await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    const { meal } = await sut.handle({
      userId: mealCreated.user_id,
      mealId: mealCreated.id,
    })

    expect(meal).toEqual(
      expect.objectContaining({ name: 'Torrada com geleia integral' }),
    )
  })
})
