import { DbGetEmployeeUseCase } from '../../../data/usecases/dbGetEmployee'
import { GetEmployeeUseCase } from '../../../domain/usecases/getEmployee'
import { DynamoRepository } from '../../../infra/database/dynamoRepository'

export const makeGetEmployeeUseCase = (): GetEmployeeUseCase => {
  const dynamoRepository = new DynamoRepository()
  return new DbGetEmployeeUseCase(dynamoRepository)
}
