import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetMealsService } from './get-meals-service'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealsService

describe('Get Meal Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealsService(mealsRepository)
  })

  it('should be able to get a meal', async () => {
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

  it('should not be able to get a meal', async () => {
    const mealCreated = await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    await expect(() =>
      sut.handle({
        userId: 'user-non-existing',
        mealId: mealCreated.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
