import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { DeleteMealService } from './delete-meal-service'
import { ResourceNotFoundError } from './errors/resource-not-found'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealService

describe('Delete Meal Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealService(mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const meal = await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    await sut.handle({
      mealId: meal.id,
      userId: 'user-1',
    })

    expect(mealsRepository.items).toEqual([])
  })

  it('should not be able to delete a meal', async () => {
    const meal = await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    await expect(() =>
      sut.handle({
        mealId: meal.id,
        userId: 'user-2',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
