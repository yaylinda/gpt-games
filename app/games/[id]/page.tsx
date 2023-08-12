import GamePageComponent from '@/app/games/[id]/GamePageComponent';
import ClientApp from '@/components/client/ClientApp';
import { subtitle, title } from '@/components/primitives';
import { Tables } from '@/types';
import { Database } from '@/types/db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function GamePage({
    params: { id },
}: {
    params: {
        id: string;
    };
}) {
    const supabase = createServerComponentClient<Database>({ cookies });

    // const {
    //     data: { session },
    // } = await supabase.auth.getSession();

    // if (session) {
    //     return <ClientApp userId={session.user.id} />;
    // }

    const { data, error } = await supabase.from(Tables.GAMES).select().eq('id', id);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <GamePageComponent gameId={id} />
        </section>
    );
}
