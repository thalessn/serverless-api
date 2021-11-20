import { EmployeeModel } from '../employee'

export interface DeleteEmployeeModel {
  id: string
}

export interface DeleteEmployeeUseCase {
  execute(id: DeleteEmployeeModel): Promise<void>
}
