import { exampleRouter } from "./routers/example";
import { createTrpcRouter } from "./trpc";

export const appRouter = createTrpcRouter({
        example: exampleRouter
    }
)

// export type definition of API
export type AppRouter = typeof appRouter;