import { EmployeeModel } from '../employee'

export interface CreateEmployeeModel {
  nome: string
  idade: string
  cargo: string
}

export interface CreateEmployeeUseCase {
  execute(employee: CreateEmployeeModel): Promise<EmployeeModel>
}
