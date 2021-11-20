import { UpdateEmployeeController } from '../../../controllers/UpdateEmployee/updateEmployeeController'
import { makeUpdateEmployeeUseCase } from '../usecases/updateEmployeeFactory'

const makeUpdateEmployeeController = (): UpdateEmployeeController => {
  const updateEmployeeUseCase = makeUpdateEmployeeUseCase()
  return new UpdateEmployeeController(updateEmployeeUseCase)
}
