import { DbUpdateEmployeeUseCase } from '../../../data/usecases/dbUpdateEmployee'
import { UpdateEmployeeUseCase } from '../../../domain/usecases/updateEmployee'
import { DynamoRepository } from '../../../infra/database/dynamoRepository'

export const makeUpdateEmployeeUseCase = (): UpdateEmployeeUseCase => {
  const dynamoRepository = new DynamoRepository()
  return new DbUpdateEmployeeUseCase(dynamoRepository)
}
