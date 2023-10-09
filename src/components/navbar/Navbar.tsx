import React from 'react'

interface INavbarProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Navbar = ({
    
}: INavbarProps) => {
    return (
        <div about='component' className='w-full flex justify-center' >
            Navbar
        </div>
    )
}
export default Navbar;