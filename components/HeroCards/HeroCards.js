// import HeroCard from 'components/HeroCards/HeroCard';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const HeroCards = ({ bannerGroups }) => {
    return (
        <Carousel
            autoPlay
            infiniteLoop={true}
            interval='10000'
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            useKeyboardArrows={false}
            stopOnHover={true}>
            {bannerGroups.map((bannerGroup, bannerGroupIndex) => (
                <section key={`Banner_group_${bannerGroupIndex}`} className='grid grid-cols-3 gap-4 h-[180px]'>
                    {bannerGroup.map(banner =>
                        <article key={`HeroBanner_${banner.id}`} className='card shadow-lg rounded-none bg-secondary text-center text-black flex'>
                            <figure>
                                <img
                                    className='h-[180px] w-full'
                                    alt={banner.alt || banner.name}
                                    src={banner.banner.url}/>
                            </figure>
                        </article>
                    )}
                </section>
            ))}
        </Carousel>
    );
};

export default HeroCards;