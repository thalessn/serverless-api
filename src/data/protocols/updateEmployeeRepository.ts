import { EmployeeModel } from '../../domain/employee'
import { UpdateEmployeeModel } from '../../domain/usecases/updateEmployee'

export interface UpdateEmployeeRepository {
  update(employee: UpdateEmployeeModel): Promise<EmployeeModel>
}
