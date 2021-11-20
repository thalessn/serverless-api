import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import { makeUpdateEmployeeController } from './factories/controllers/updateEmployeeFactory'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id
    const body = event.body ? JSON.parse(event.body) : ''
    if (id && body) {
      const controller = makeUpdateEmployeeController()
      const response = await controller.handle({
        params: {
          id,
        },
        body,
      })

      return {
        statusCode: response.statusCode,
        body: JSON.stringify(response.body),
      }
    }

    return {
      statusCode: 400,
      body: 'The param id or body were not found',
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      body: err.message,
    }
  }
}
