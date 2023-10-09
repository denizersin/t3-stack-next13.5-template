import React, { useState } from 'react'
import { getServerAuthSession } from '../api/auth/[...nextauth]/route';
import { headers } from 'next/headers'
import { Session } from 'next-auth';
interface IpageProps {
    children?: React.ReactNode | React.ReactNode[];
}

const page = async ({ }: IpageProps) => {

    const req = {
        headers: {
            cookie: headers().get('cookie'),
        },
    };

 
    

    return (
        <div about='component' className='' >
            register
        </div>
    )
}
export default page;