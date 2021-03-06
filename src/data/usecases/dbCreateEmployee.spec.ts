import {
  CreateEmployeeModel,
  CreateEmployeeUseCase,
} from '../../domain/usecases/createEmployee'
import { DbCreateEmployeeUseCase } from './dbCreateEmployee'
import { CreateEmployeeRepository } from '../protocols/createEmployeeRepository'
import { EmployeeModel } from '../../domain/employee'

const makeCreateEmployeeRepository = (): CreateEmployeeRepository => {
  class CreateEmployeeRepositoryStub implements CreateEmployeeRepository {
    async add(employee: CreateEmployeeModel): Promise<EmployeeModel> {
      return {
        id: 'id',
        nome: 'Thales',
        idade: '28',
        cargo: 'Desenvolvedor',
      }
    }
  }
  return new CreateEmployeeRepositoryStub()
}

interface SutTypes {
  sut: CreateEmployeeUseCase
  createEmployeeRepositoryStub: CreateEmployeeRepository
}

const makeSut = (): SutTypes => {
  const createEmployeeRepositoryStub = makeCreateEmployeeRepository()
  const sut = new DbCreateEmployeeUseCase(createEmployeeRepositoryStub)
  return {
    sut,
    createEmployeeRepositoryStub,
  }
}

describe('DbCreateEmployee UseCase', () => {
  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, createEmployeeRepositoryStub } = makeSut()
    const createRepositoryStubSpy = jest.spyOn(
      createEmployeeRepositoryStub,
      'add'
    )
    const employee = {
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    }
    await sut.execute(employee)
    expect(createRepositoryStubSpy).toHaveBeenCalledWith({
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    })
  })

  it('Should throw if CreateEmployeeRepository throws', async () => {
    const { sut, createEmployeeRepositoryStub } = makeSut()
    jest
      .spyOn(createEmployeeRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const employeeData = {
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    }
    const promise = sut.execute(employeeData)
    await expect(promise).rejects.toThrow()
  })

  it('Should return an Employee on sucess', async () => {
    const { sut } = makeSut()
    const employeeData = {
      nome: 'Thales',
      idade: '28',
      cargo: 'Desenvolvedor',
    }
    const employee = await sut.execute(employeeData)
    expect(employee).toEqual({
      id: 'id',
      nome: 'Thales',
      idade: '28',
      cargo: 'Desenvolvedor',
    })
  })
})
