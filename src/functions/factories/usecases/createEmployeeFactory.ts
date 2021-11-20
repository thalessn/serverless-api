import { DbCreateEmployeeUseCase } from '../../../data/usecases/dbCreateEmployee'
import { CreateEmployeeUseCase } from '../../../domain/usecases/createEmployee'
import { DynamoRepository } from '../../../infra/database/dynamoRepository'

export const makeCreateEmployeeUseCase = (): CreateEmployeeUseCase => {
  const dynamoRepository = new DynamoRepository()
  return new DbCreateEmployeeUseCase(dynamoRepository)
}
