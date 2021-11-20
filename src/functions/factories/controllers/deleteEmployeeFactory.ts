import { DeleteEmployeeController } from '../../../controllers/DeleteEmployee/deleteEmployeeController'
import { Controller } from '../../../controllers/protocols/controller'
import { makeDeleteEmployeeUseCase } from '../usecases/deleteEmployeeFactory'

export const makeDeleteEmployeeController = (): Controller => {
  const dbDeleteEmployeeUseCase = makeDeleteEmployeeUseCase()
  return new DeleteEmployeeController(dbDeleteEmployeeUseCase)
}
