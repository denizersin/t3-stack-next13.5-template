import { z } from "zod";
import { adminProcedure, createTrpcRouter, protectedProcedure, publicProcedure } from "../trpc";

//zod schema
const schema = z.object({
    text: z.string(),
})

export const exampleRouter = createTrpcRouter({
    hello: publicProcedure
        .input(schema)
        .query(({ input, ctx }) => {
            console.log(ctx);
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getUserName: publicProcedure.query(async ({ ctx }) => {
        const userName = ctx.session?.user.name
        return { userName }
    }),

    // authenticates the user
    getSecretMessage: protectedProcedure.query(() => {
        return "I am secret!";
    }),
    test: adminProcedure.input(schema).query(({ input, ctx }) => {
        //now our context has admin property
        console.log(ctx.admin);
    })
});
