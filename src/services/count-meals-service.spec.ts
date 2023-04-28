import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CountMealsService } from './count-meals-service'

let mealsRepository: InMemoryMealsRepository
let sut: CountMealsService

describe('Count Meals Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CountMealsService(mealsRepository)
  })

  it('should be able to count meals', async () => {
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

    expect(meals).toEqual(2)
  })
})
