import { CreateEmployeeController } from './createEmployeeController'
import { MissingParamError } from '../errors/missing-param-error'
import { EmployeeModel } from '../../domain/employee'
import {
  CreateEmployeeModel,
  CreateEmployeeUseCase,
} from '../../domain/usecases/createEmployee'

const makeCreateEmployee = (): CreateEmployeeUseCase => {
  class CreateEmployeeUseCaseStub implements CreateEmployeeUseCase {
    async execute(employee: CreateEmployeeModel): Promise<EmployeeModel> {
      const fakeEmployee = {
        id: 'id',
        nome: 'John',
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
  it('Should return error 400 if property nome not found', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        idade: '30',
        cargo: 'chefia',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('nome'))
  })

  it('Should return error 400 if property idade not found', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'John',
        cargo: 'chefia',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('idade'))
  })

  it('Should return error 400 if property cargo not found', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'John',
        idade: '30',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cargo'))
  })

  it('Should call CreateEmployeeUseCase with the correct values', async () => {
    const { sut, createEmployeeUseCaseStub } = makeSut()
    const createEmployeeSpy = jest.spyOn(createEmployeeUseCaseStub, 'execute')
    const httpRequest = {
      body: {
        nome: 'John',
        idade: '30',
        cargo: 'chefia',
      },
    }

    await sut.handle(httpRequest)
    expect(createEmployeeSpy).toHaveBeenCalledWith({
      nome: 'John',
      idade: '30',
      cargo: 'chefia',
    })
  })

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'John',
        idade: '30',
        cargo: 'Chefia',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body).toEqual({
      id: 'id',
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    })
  })
})
