import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CreateUserService } from './create-user-service'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

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

  it('should not be able to register a user with same email', async () => {
    await sut.handle({
      email: 'gabriel@gmail.com',
      name: 'Gabriel Lira',
    })

    await expect(
      sut.handle({
        email: 'gabriel@gmail.com',
        name: 'Gabriel Lira',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
