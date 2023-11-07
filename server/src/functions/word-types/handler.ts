import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import { CountWordTypes, MyValidatedEvent } from './types';
import vocabulary from './vocabulary/vocabulary.json';
import WordTypesService from './service';

const wordTypesService = new WordTypesService(vocabulary);

const wordTypes: ValidatedEventAPIGatewayProxyEvent<MyValidatedEvent> = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const inputText = event.body.text;
    const wordTypeCounts: CountWordTypes = wordTypesService.getWordTypeCounts(inputText);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(wordTypeCounts),
    };
  } catch (error) {
    console.error('Error processing the word types:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const main = middyfy(wordTypes);
