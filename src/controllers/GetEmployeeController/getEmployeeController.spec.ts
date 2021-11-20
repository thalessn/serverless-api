import { EmployeeModel } from '../../domain/employee'
import { MissingParamError } from '../errors/missing-param-error'
import { GetEmployeeController } from './getEmployeeController'
import { GetEmployeeUseCase } from '../../domain/usecases/getEmployee'

const makeGetEmployeeUseCaseStub = (): GetEmployeeUseCase => {
  class GetEmployeeUseCaseStub implements GetEmployeeUseCase {
    async execute(id: string): Promise<EmployeeModel> {
      const employee = {
        id: 'da563c88-c47d-4f1d-a501-08d7b70e3e17',
        nome: 'Thales',
        idade: '28',
        cargo: 'Desenvolvedor',
      }
      return employee
    }
  }
  return new GetEmployeeUseCaseStub()
}

interface SutType {
  sut: GetEmployeeController
  getEmployeeUseCaseStub: GetEmployeeUseCase
}

const makeSut = (): SutType => {
  const getEmployeeUseCaseStub = makeGetEmployeeUseCaseStub()
  const sut = new GetEmployeeController(getEmployeeUseCaseStub)
  return {
    sut,
    getEmployeeUseCaseStub,
  }
}

describe('GetEmployeeController', () => {
  it('Should return error 400 if param id not found', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {},
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('id'))
  })

  it('Should call GetEmployeeUseCase with the correct values', async () => {
    const { sut, getEmployeeUseCaseStub } = makeSut()
    const getSpy = jest.spyOn(getEmployeeUseCaseStub, 'execute')
    const httpRequest = {
      params: {
        id: 'da563c88-c47d-4f1d-a501-08d7b70e3e17',
      },
    }

    await sut.handle(httpRequest)
    expect(getSpy).toHaveBeenCalledWith('da563c88-c47d-4f1d-a501-08d7b70e3e17')
  })

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'da563c88-c47d-4f1d-a501-08d7b70e3e17',
      },
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      id: 'da563c88-c47d-4f1d-a501-08d7b70e3e17',
      nome: 'Thales',
      idade: '28',
      cargo: 'Desenvolvedor',
    })
  })
})
