import { HttpRequest } from '../../controllers/protocols/http'
import { EmployeeModel } from '../employee'

export interface UpdateEmployeeModel {
  id: string
  nome: string
  idade: string
  cargo: string
}

export interface UpdateEmployeeUseCase {
  execute(updateEmployee: UpdateEmployeeModel): Promise<EmployeeModel>
}
