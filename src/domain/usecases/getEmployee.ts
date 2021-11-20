import { EmployeeModel } from '../employee'

export interface GetEmployeeUseCase {
  execute(id: string): Promise<EmployeeModel>
}
