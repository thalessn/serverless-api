import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import { makeGetEmployeeController } from './factories/controllers/getEmployeeFactory'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id
    if (id) {
      const controller = makeGetEmployeeController()
      const response = await controller.handle({
        params: {
          id,
        },
      })

      return {
        statusCode: response.statusCode,
        body: JSON.stringify(response.body),
      }
    }

    return {
      statusCode: 400,
      body: 'The param id was not found',
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      body: err.message,
    }
  }
}
