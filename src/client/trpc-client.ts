import { AppRouter } from '@/server/api/root';
import { createTRPCReact } from '@trpc/react-query';
export const trpcReact = createTRPCReact<AppRouter>();
