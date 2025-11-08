import { NextResponse, type NextRequest } from 'next/server';

type Middleware = (req: NextRequest) => Promise<Response | void>;

export function composeMiddleware(...middlewares: Middleware[]) {
  return async function (req: NextRequest): Promise<Response | undefined> {
    for (const middleware of middlewares) {
      const result = await middleware(req);
      if (result instanceof Response) {
        return result;
      }
    }
    return NextResponse.next();
  };
}
