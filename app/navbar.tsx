import { Navbar } from '@/components/_common/Navbar';
import { Database } from '@/types/db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function NavbarWrapper() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return <Navbar session={session} />;
}
