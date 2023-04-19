import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CreateMealService } from './create-meal-service'

let mealsRepository: InMemoryMealsRepository
let sut: CreateMealService

describe('Create Meal Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealService(mealsRepository)
  })

  it('should be able to register a user', async () => {
    const { meal } = await sut.handle({
      createdAt: new Date(),
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      isDiet: true,
      userId: 'user-id',
    })

    expect(meal.id).toEqual(expect.any(String))
  })
})
