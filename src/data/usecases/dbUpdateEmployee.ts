import { EmployeeModel } from '../../domain/employee'
import {
  UpdateEmployeeUseCase,
  UpdateEmployeeModel,
} from '../../domain/usecases/updateEmployee'
import { UpdateEmployeeRepository } from '../protocols/updateEmployeeRepository'

export class DbUpdateEmployeeUseCase implements UpdateEmployeeUseCase {
  private readonly updateEmployeeRepository: UpdateEmployeeRepository
  constructor(updateEmployeeRepository: UpdateEmployeeRepository) {
    this.updateEmployeeRepository = updateEmployeeRepository
  }

  async execute(employeeData: UpdateEmployeeModel): Promise<EmployeeModel> {
    const updatedEmployee = await this.updateEmployeeRepository.update(
      employeeData
    )
    return updatedEmployee
  }
}
