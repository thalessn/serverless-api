import { CreateEmployeeController } from '../../../controllers/CreateEmployee/CreateEmployeeController'
import { Controller } from '../../../controllers/protocols/controller'
import { makeCreateEmployeeUseCase } from '../usecases/createEmployeeFactory'

export const makeCreateEmployeeController = (): Controller => {
  const createEmployeeUseCase = makeCreateEmployeeUseCase()
  return new CreateEmployeeController(createEmployeeUseCase)
}
