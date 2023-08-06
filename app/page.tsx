import { subtitle, title } from '@/components/primitives';

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="flex flex-col max-w-lg text-center justify-center gap-4">
                <span>
                    <h1 className={title()}>Play&nbsp;</h1>
                    <h1 className={title({ color: 'green' })}>games</h1>
                </span>

                <span>
                    <h1 className={title()}>&&nbsp;</h1>
                    <h1 className={title({ color: 'blue' })}>chat</h1>
                </span>

                <span>
                    <h1 className={title()}>w/&nbsp;</h1>
                    <h1 className={title({ color: 'pink' })}>friends</h1>
                </span>

                <span className="mt-4">
                    <h2 className={subtitle()}>Powered by&nbsp;</h2>
                    <h2 className={subtitle({ color: 'violet' })}>GPT</h2>
                </span>
            </div>
        </section>
    );
}
