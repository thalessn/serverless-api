import { EmployeeModel } from '../../domain/employee'
import {
  UpdateEmployeeUseCase,
  UpdateEmployeeModel,
} from '../../domain/usecases/updateEmployee'
import { MissingParamError } from '../errors/missing-param-error'
import { UpdateEmployeeController } from './updateEmployeeController'

const makeUpdateUseCaseStub = (): UpdateEmployeeUseCase => {
  class UpdateEmployeeUseCaseStub implements UpdateEmployeeUseCase {
    async execute(updateEmployee: UpdateEmployeeModel): Promise<EmployeeModel> {
      const updatedEmployee = {
        id: updateEmployee.id,
        nome: updateEmployee.nome,
        idade: updateEmployee.idade,
        cargo: updateEmployee.cargo,
      }
      return updateEmployee
    }
  }
  return new UpdateEmployeeUseCaseStub()
}

interface SutType {
  sut: UpdateEmployeeController
  updateEmployeeUseCaseStub: UpdateEmployeeUseCase
}

const makeSut = (): SutType => {
  const updateEmployeeUseCaseStub = makeUpdateUseCaseStub()
  const sut = new UpdateEmployeeController(updateEmployeeUseCaseStub)
  return {
    sut,
    updateEmployeeUseCaseStub,
  }
}

describe('UpdateEmployeeController', () => {
  it('Should return 400 if id param not found', async () => {
    const { sut } = makeSut()
    const httpResquest = {
      body: {
        nome: 'Thales',
        idade: '30',
        cargo: 'Desenvolvimento',
      },
    }
    const employee = await sut.handle(httpResquest)
  })

  it('Should return error 400 if property nome not found', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: '1234',
      },
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
      params: {
        id: '1234',
      },
      body: {
        nome: 'THales',
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
      params: {
        id: '1234',
      },
      body: {
        nome: 'Thales',
        idade: '30',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cargo'))
  })

  it('Should call UpdateEmployeeUseCase with the correct values', async () => {
    const { sut, updateEmployeeUseCaseStub } = makeSut()
    const updateEmployeeSpy = jest.spyOn(updateEmployeeUseCaseStub, 'execute')
    const httpRequest = {
      params: {
        id: '1234',
      },
      body: {
        nome: 'John',
        idade: '30',
        cargo: 'chefia',
      },
    }

    await sut.handle(httpRequest)
    expect(updateEmployeeSpy).toHaveBeenCalledWith({
      id: '1234',
      nome: 'John',
      idade: '30',
      cargo: 'chefia',
    })
  })

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: '1234',
      },
      body: {
        nome: 'John',
        idade: '30',
        cargo: 'Chefia',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body).toEqual({
      id: '1234',
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    })
  })
})
