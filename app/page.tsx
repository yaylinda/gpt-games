import {subtitle, title} from '@/components/primitives';

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="flex flex-col max-w-lg text-center justify-center gap-4">
                <h1 className={title({size: 'lg'})}>
                    Play
                    <h1 className={title({
                        size: 'lg',
                        color: 'green'
                    })}> games</h1>
                </h1>
                <h1 className={title({size: 'lg'})}>with friends</h1>
                <h1 className={title({size: 'lg'})}>online.</h1>
                <h2 className={subtitle({class: 'mt-4'})}>
                    Powered by
                    <h2 className={subtitle({
                        class: 'mt-4 font-bold',
                        color: 'violet'
                    })}> GPT</h2>
                </h2>
            </div>
        </section>
    );
}
