import { CreateEmployeeController } from './CreateEmployeeController'
import { MissingParamError } from '../errors/missing-param-error'
import { EmployeeModel } from '../../domain/employee'
import {
  CreateEmployeeModel,
  CreateEmployeeUseCase,
} from '../../domain/usecases/createEmployee'

const makeCreateEmployee = (): CreateEmployeeUseCase => {
  class CreateEmployeeUseCaseStub implements CreateEmployeeUseCase {
    execute(employee: CreateEmployeeModel): EmployeeModel {
      const fakeEmployee = {
        id: 'id',
        nome: 'Thales',
        idade: '30',
        cargo: 'Chefia',
      }
      return fakeEmployee
    }
  }
  return new CreateEmployeeUseCaseStub()
}

interface SutTypes {
  sut: CreateEmployeeController
  createEmployeeUseCaseStub: CreateEmployeeUseCase
}

const makeSut = (): SutTypes => {
  const createEmployeeUseCaseStub = makeCreateEmployee()
  const sut = new CreateEmployeeController(createEmployeeUseCaseStub)
  return {
    sut,
    createEmployeeUseCaseStub,
  }
}

describe('CreateEmployeeController', () => {
  it('Should return error 400 if property nome not found', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        idade: '30',
        cargo: 'chefia',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('nome'))
  })

  it('Should return error 400 if property idade not found', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'John',
        cargo: 'chefia',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('idade'))
  })

  it('Should return error 400 if property cargo not found', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'John',
        idade: '30',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cargo'))
  })

  it('Should call CreateEmployeeUseCase with the correct values', () => {
    const { sut, createEmployeeUseCaseStub } = makeSut()
    const createEmployeeSpy = jest.spyOn(createEmployeeUseCaseStub, 'execute')
    const httpRequest = {
      body: {
        nome: 'John',
        idade: '30',
        cargo: 'chefia',
      },
    }

    sut.handle(httpRequest)
    expect(createEmployeeSpy).toHaveBeenCalledWith({
      nome: 'John',
      idade: '30',
      cargo: 'chefia',
    })
  })
})
