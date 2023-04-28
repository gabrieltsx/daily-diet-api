import { MealsRepository } from '@/repositories/meals-repository'

interface CountMealsNotDietsServiceRequest {
  userId: string
}

interface CountMealsNotDietsServiceResponse {
  notDiets: number
}

export class CountMealsNotDietsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle({
    userId,
  }: CountMealsNotDietsServiceRequest): Promise<CountMealsNotDietsServiceResponse> {
    const notDiets = await this.mealsRepository.countNotDietsByUserId(userId)

    return {
      notDiets,
    }
  }
}
