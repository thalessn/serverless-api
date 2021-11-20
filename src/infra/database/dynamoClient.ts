import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

const REGION = 'us-east-2'

const dynamoClient = new DynamoDBClient({ region: REGION })
export { dynamoClient }
