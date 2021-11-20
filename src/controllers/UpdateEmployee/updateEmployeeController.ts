import { UpdateEmployeeUseCase } from '../../domain/usecases/updateEmployee'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class UpdateEmployeeController implements Controller {
  private readonly updateEmployeeUseCase: UpdateEmployeeUseCase
  constructor(updateEmployeeUseCase: UpdateEmployeeUseCase) {
    this.updateEmployeeUseCase = updateEmployeeUseCase
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params['id']) {
        return badRequest(new MissingParamError('id'))
      }

      const requiredFields = ['nome', 'idade', 'cargo']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { id } = httpRequest.params
      const { nome, idade, cargo } = httpRequest.body
      const updatedEmployee = await this.updateEmployeeUseCase.execute({
        id,
        nome,
        idade,
        cargo,
      })

      return {
        statusCode: 200,
        body: updatedEmployee,
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        body: error.message,
      }
    }
  }
}
