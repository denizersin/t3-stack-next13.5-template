import { initTRPC, type inferAsyncReturnType, TRPCError } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from '@/server/db';
import { Session, getServerSession } from 'next-auth';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';





type CreateContextOptions = {
    session: Session | null;
};


const createInnerTRPCContext = (opts: CreateContextOptions) => {
    return {
        session: opts.session,
    };
};



export const createTrpcContext = async (opts: FetchCreateContextFnOptions) => {

    const session = await getServerSession()
    return createInnerTRPCContext({
        session
    });
}

const t = initTRPC.context<typeof createTrpcContext>().create(
    {
        // transformer:superjson,
    }
);
export const createTrpcRouter = t.router;


const middleware = t.middleware

const isAuth = middleware(async (opts) => {

    const session = await getServerSession();
    if (!session?.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to do this',
        });
    }
    return opts.next({
        ctx: {
            session
        },
    });
})

export const protectedProcedure = t.procedure.use(isAuth)
export const publicProcedure = t.procedure

const isAdmin = middleware(async (opts) => {
    const isAdmin = opts.ctx.session?.user.email==='admin@gmail.com';
    if (!isAdmin) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be admin to do this',
        })
    }
    return opts.next({
        ctx: {
            admin: true
        }
    })
})

export const adminProcedure = t.procedure.use(isAdmin)