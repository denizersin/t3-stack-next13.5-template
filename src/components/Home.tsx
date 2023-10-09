"use client";
import { trpcReact } from "@/client/trpc-client";
import { useSession, signIn, signOut } from "next-auth/react"
import React, { FC, useEffect } from 'react'
import { buttonVariants } from "./ui/button";

interface IHomeProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Home: FC<IHomeProps> = ({ }: IHomeProps) => {

    const s = useSession();
    const { data, isLoading } = trpcReact.example.hello.useQuery({ text: 'hello' });
    console.log(data,isLoading);
    console.log(s);
    return (
        <div className='Home component'><span>Home</span>
            <br />
            {/* <button className='border border-black p-3 mb-2 bg-gray-300 hover:bg-slate-50'  onClick={()=>signIn('credentials',{
                username:'admin',
            })}>signin credentials</button> */}
            <button onClick={() => signIn()}>sign in</button>
            <br />
            <button className='border border-black p-3 mb-2 bg-gray-300 hover:bg-slate-50' onClick={() => signIn('discord')}>signin discord</button>
            <br />
            <button className='border border-black p-3 mb-2 bg-gray-300 hover:bg-slate-50' onClick={() => signOut()}>signout</button>
            <span className={buttonVariants({variant:"destructive",className:'px-20 cursor-pointer ml-3'})}>Test</span>
        </div>
    )
}
export default Home;