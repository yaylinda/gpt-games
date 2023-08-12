import ClientApp from '@/components/client/ClientApp';
import { subtitle, title } from '@/components/primitives';
import { Database } from '@/types/db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        // TODO - think about if client app components can be broken down into multiple server components, with caching
        return <ClientApp userId={session.user.id} />;
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="flex flex-col max-w-lg text-center justify-center gap-4">
                <span>
                    <h1 className={title()}>Play&nbsp;</h1>
                    <h1 className={title({ color: 'success' })}>games</h1>
                </span>

                <span>
                    <h1 className={title()}>&&nbsp;</h1>
                    <h1 className={title({ color: 'primary' })}>chat</h1>
                </span>

                <span>
                    <h1 className={title()}>w/&nbsp;</h1>
                    <h1 className={title({ color: 'danger' })}>friends</h1>
                </span>

                <span className="mt-4">
                    <h2 className={subtitle()}>Powered by&nbsp;</h2>
                    <h2 className={subtitle({ color: 'secondary' })}>GPT</h2>
                </span>
            </div>
        </section>
    );
}
