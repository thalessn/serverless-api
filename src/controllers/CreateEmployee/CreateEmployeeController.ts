import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'
import { CreateEmployeeUseCase } from '../../domain/usecases/createEmployee'
import { badRequest, ok } from '../helpers/http-helper'

export class CreateEmployeeController implements Controller {
  private readonly createEmployeeUseCase: CreateEmployeeUseCase

  constructor(createEmployeeUseCase: CreateEmployeeUseCase) {
    this.createEmployeeUseCase = createEmployeeUseCase
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['nome', 'idade', 'cargo']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { nome, idade, cargo } = httpRequest.body
    const employee = await this.createEmployeeUseCase.execute({
      nome,
      idade,
      cargo,
    })

    return ok(employee)
  }
}
