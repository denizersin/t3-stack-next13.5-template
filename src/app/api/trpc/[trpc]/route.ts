import { appRouter } from '@/server/api/root';
import { createTrpcContext } from '@/server/api/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (request: Request) => {

    console.log(`incoming request ${request.url}`)

    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext: createTrpcContext

    });
}

export const GET = handler;
export const POST = handler;