'use-client'

// React
import React from 'react'

// Router
import { useRouter } from 'next/router';

// Shadcn IU
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default ({ items }) => {
    const router = useRouter();

    return (
        <React.Fragment>
            <div className=''>
                <ul className='menu menu-horizontal text-white p-0 mr-[-16px]'>
                    {items.map((item, index) => {
                        return (
                            <li key={`Header-nav-item-${index}`}>
                                <a
                                    className={`${router.asPath === item.action ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'} font-light decoration-1 hover:bg-transparent text-2xl`}
                                    onClick={() => handleClick(item)}
                                >
                                    {item.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </React.Fragment>
    )
}