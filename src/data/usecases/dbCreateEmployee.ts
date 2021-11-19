import { EmployeeModel } from '../../domain/employee'
import { CreateEmployeeRepository } from '../protocols/createEmployeeRepository'
import {
  CreateEmployeeModel,
  CreateEmployeeUseCase,
} from '../../domain/usecases/createEmployee'

export class DbCreateEmployeeUseCase implements CreateEmployeeUseCase {
  private readonly createEmployeeRepository: CreateEmployeeRepository

  constructor(createEmployeeRepository: CreateEmployeeRepository) {
    this.createEmployeeRepository = createEmployeeRepository
  }

  async execute(employee: CreateEmployeeModel): Promise<EmployeeModel> {
    const createdEmployee = this.createEmployeeRepository.add(employee)
    return createdEmployee
  }
}
