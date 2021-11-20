import { DbDeleteEmployeeUseCase } from '../../../data/usecases/dbDeleteEmployee'
import { DeleteEmployeeUseCase } from '../../../domain/usecases/deleteEmployee'
import { DynamoRepository } from '../../../infra/database/dynamoRepository'

export const makeDeleteEmployeeUseCase = (): DeleteEmployeeUseCase => {
  const dynamoRepository = new DynamoRepository()
  return new DbDeleteEmployeeUseCase(dynamoRepository)
}
