import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'
import { CreateEmployeeUseCase } from '../../domain/usecases/createEmployee'

export class CreateEmployeeController implements Controller {
  private readonly createEmployeeUseCase: CreateEmployeeUseCase

  constructor(createEmployeeUseCase: CreateEmployeeUseCase) {
    this.createEmployeeUseCase = createEmployeeUseCase
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['nome', 'idade', 'cargo']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field),
        }
      }
    }

    const { nome, idade, cargo } = httpRequest.body
    const employee = this.createEmployeeUseCase.execute({
      nome,
      idade,
      cargo,
    })

    return {
      statusCode: 200,
      body: employee,
    }
  }
}
