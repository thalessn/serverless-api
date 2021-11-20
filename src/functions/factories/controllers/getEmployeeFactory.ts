import { GetEmployeeController } from '../../../controllers/GetEmployeeController/getEmployeeController'
import { Controller } from '../../../controllers/protocols/controller'
import { makeGetEmployeeUseCase } from '../usecases/getEmployeeFactory'

export const makeGetEmployeeController = (): Controller => {
  const getEmployeeUseCase = makeGetEmployeeUseCase()
  return new GetEmployeeController(getEmployeeUseCase)
}
