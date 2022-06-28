// import HeroCard from 'components/HeroCards/HeroCard';

const HeroCards = ({ banners }) => {
    return (
        <section className='grid grid-cols-7 gap-4 h-[142px]'>
            <article className='card rounded-none col-span-3 flex'>
                <figure>
                    <img
                        className='h-[142px] w-full'
                        src='logo_ucr.png'/>
                </figure>
            </article>
            {banners.map(banner => (
                <article key={`HeroBanner_${banner.id}`} className='card rounded-none col-span-2 bg-secondary text-center text-black flex'>
                    <figure>
                        <img
                            className='h-[142px] w-full'
                            alt={banner.alt || banner.name}
                            src={banner.banner.url}/>
                    </figure>
                </article>
            ))}
        </section>
    );
};

export default HeroCards;