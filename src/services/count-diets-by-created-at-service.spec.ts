import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CountDietsByCreatedAtService } from './count-diets-by-created-at-service'

let mealsRepository: InMemoryMealsRepository
let sut: CountDietsByCreatedAtService

describe('Count Meals Diet Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CountDietsByCreatedAtService(mealsRepository)

    // vi.useFakeTimers()
  })

  // afterEach(() => {
  //   vi.useRealTimers()
  // })

  it('should be able to count meals by diet true', async () => {
    // vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    await mealsRepository.create({
      description: 'Lanche da tarde',
      name: 'Torrada com geleia integral',
      is_diet: true,
      user_id: 'user-1',
      created_at: new Date(),
    })

    // vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    await mealsRepository.create({
      description: 'Jantar',
      name: 'MC Donalds',
      is_diet: false,
      user_id: 'user-1',
      created_at: new Date(),
    })

    const { countDietsResponse } = await sut.handle({
      userId: 'user-1',
    })

    expect(countDietsResponse).toEqual([
      expect.objectContaining({
        countDiet: 2,
      }),
    ])
  })
})
