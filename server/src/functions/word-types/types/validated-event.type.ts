import { APIGatewayProxyResult } from "aws-lambda";

export type ValidatedEventAPIGatewayProxyEvent<T> = (event: T) => Promise<APIGatewayProxyResult>;