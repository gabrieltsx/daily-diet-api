import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CountMealsNotDietsService } from './count-meals-not-diets-service'

let mealsRepository: InMemoryMealsRepository
let sut: CountMealsNotDietsService

describe('Count Meals Diet Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CountMealsNotDietsService(mealsRepository)
  })

  it('should be able to count meals by diet false', async () => {
    await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: false,
      user_id: 'user-1',
      created_at: new Date(),
    })

    await mealsRepository.create({
      description: 'Jantar',
      name: 'MC Donalds',
      is_diet: false,
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

    const { notDiets } = await sut.handle({
      userId: 'user-1',
    })

    expect(notDiets).toEqual(2)
  })
})
