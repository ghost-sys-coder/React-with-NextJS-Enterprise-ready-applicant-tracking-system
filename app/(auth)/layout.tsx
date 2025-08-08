import React, { ReactNode } from 'react'
import Image from 'next/image'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = await auth();

    if (isAuthenticated) return redirect("/explore");
    
    return (
        <main className='flex gap-2 min-h-screen justify-center items-center'>
            <div className="flex-1 h-full max-md:hidden">
                <Image
                    src={"/assets/auth-image.svg"}
                    alt='auth image'
                    width={100} height={100}
                    className='w-full h-full object-cover'
                />
            </div>
            <div className="w-[600px] flex justify-center items-center flex-1">
                {children}
            </div>
        </main>
    )
}

export default AuthLayout