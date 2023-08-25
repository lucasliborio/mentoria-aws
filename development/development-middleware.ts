import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { Response as InternalResponse } from "aws-serverless-express";
import { Request, RequestHandler, Response } from "express";
import { handler } from "src/main";


const developmentMiddleware = (): RequestHandler => async (
    request: Request,
    response: Response,
): Promise<void> => {
    const headers: { [name: string]: string } =
        request.headers["x-amz-date"] !== undefined
            ? {
                "content-type": "application/json",
            }
            : (request.headers as { [name: string]: string });

    const event = {
        body: (request.body as Buffer).toString(),
        headers,
        httpMethod: request.method,
        path: request.path,
        queryStringParameters: request.query,
    } as APIGatewayProxyEvent;

    const result: InternalResponse = (await handler(event, {} as Context)) as InternalResponse;

    const resultHeaders: { [key: string]: string } = result.headers;
    for (const header of Object.keys(resultHeaders)) {
        response.setHeader(header, resultHeaders[header]);
    }
    response.status(result.statusCode);
    response.send(result.body);
    response.end();
};

export { developmentMiddleware }