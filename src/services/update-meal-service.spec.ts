import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { UpdateMealService } from './update-meal-service'

let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealService

describe('Update Meal Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealService(mealsRepository)
  })

  it('should be able to update a meal', async () => {
    const melFinded = await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    const newMeal = {
      description: 'Chocolante gorduroso',
      name: 'Chocolate',
      isDiet: false,
    }

    const { meal } = await sut.handle({
      userId: 'user-1',
      mealId: melFinded.id,
      newMeal,
    })

    expect(meal).toEqual(expect.objectContaining({ name: 'Chocolate' }))
  })

  it('should not be able to update a meal', async () => {
    const melFinded = await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    const newMeal = {
      description: 'Chocolante gorduroso',
      name: 'Chocolate',
      isDiet: false,
    }

    await expect(() =>
      sut.handle({
        userId: 'user-2',
        mealId: melFinded.id,
        newMeal,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
