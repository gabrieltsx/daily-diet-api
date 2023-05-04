import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { AuthenticateService } from './authenticate-service'
import { ResourceNotFoundError } from './errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      email: 'gabriel.teste@teste.com',
      name: 'Gabriel Lira',
    })

    const { user } = await sut.handle({
      email: 'gabriel.teste@teste.com',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a user', async () => {
    await usersRepository.create({
      email: 'gabriel.teste@teste.com',
      name: 'Gabriel Lira',
    })

    await expect(() =>
      sut.handle({
        email: 'gabriel.teste-2@teste.com',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
