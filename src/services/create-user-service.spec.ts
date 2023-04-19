import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CreateUserService } from './create-user-service'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserService

describe('Create User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserService(usersRepository)
  })

  it('should be able to register a user', async () => {
    const { user } = await sut.handle({
      email: 'gabriel@gmail.com',
      name: 'Gabriel Lira',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
