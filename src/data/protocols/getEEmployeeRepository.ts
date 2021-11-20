import { EmployeeModel } from '../../domain/employee'

export interface GetEmployeeRepository {
  get(id: string): Promise<EmployeeModel>
}
