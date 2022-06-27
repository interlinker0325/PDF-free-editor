// import HeroCard from 'components/HeroCards/HeroCard';

const HeroCards = ({ banners }) => {
    return (
        <section className='grid grid-cols-7 gap-4 h-40'>
            <article className='card col-span-3 flex'>
                <figure><img src='logo_ucr.png'/></figure>
            </article>
            {banners.map(banner => (
                <article key={`HeroBanner_${banner.id}`} className='card col-span-2 bg-secondary text-center text-black flex'>
                    <figure><img alt={banner.alt || banner.name} src={banner.banner.url}/></figure>
                </article>
            ))}
        </section>
    );
};

export default HeroCards;