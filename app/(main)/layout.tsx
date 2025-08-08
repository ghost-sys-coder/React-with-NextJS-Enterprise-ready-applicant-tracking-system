import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import Navbar from '@/components/shared/Navbar';

const MainLayout = async ({ children }: { children: ReactNode }) => {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/sign-in")
    }
    // Get the Backend API User object when you need to access to the user's information
    const user = await currentUser();

    
    return (
        <main className="max-w-[1440px] mx-auto">
            <Navbar
                firstName={user?.firstName ?? ""}
                lastName={user?.lastName ?? ""}
                profileImage={user?.imageUrl ?? ""}
                email={user?.emailAddresses?.[0]?.emailAddress ?? ""}
            />
            {children}
        </main>
    )
}

export default MainLayout