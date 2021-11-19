import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'

export class CreateEmployeeController implements Controller {
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

    return {
      statusCode: 200,
    }
  }
}
