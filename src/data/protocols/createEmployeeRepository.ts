import { EmployeeModel } from '../../domain/employee'
import { CreateEmployeeModel } from '../../domain/usecases/createEmployee'

export interface CreateEmployeeRepository {
  add(employee: CreateEmployeeModel): Promise<EmployeeModel>
}
