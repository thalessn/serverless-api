import { EmployeeModel } from '../employee'

export interface DeleteEmployeeUseCase {
  execute(id: string): Promise<void>
}
