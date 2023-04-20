import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { FetchMealsService } from './fetch-meals-service'

let mealsRepository: InMemoryMealsRepository
let sut: FetchMealsService

describe('Fetch Meals Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchMealsService(mealsRepository)
  })

  it('should be able to fetch meals', async () => {
    await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    await mealsRepository.create({
      description: 'Jantar',
      name: 'MC Donalds',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    const { meals } = await sut.handle({
      userId: 'user-1',
    })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ name: 'Torrada com geleia integral' }),
      expect.objectContaining({ name: 'MC Donalds' }),
    ])
  })
})
