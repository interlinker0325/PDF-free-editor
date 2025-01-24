// React
import React from 'react'

// import HeroCard from 'components/HeroCards/HeroCard';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";

// Styles 
import styles from './styles'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Const
import Const from './const'

const HeroCards = ({ bannerGroups }) => {
    const [ viewAllBanner, setViewAllBanner ] = React.useState([])

    React.useEffect(() => {
        setViewAllBanner(bannerGroups.flat());
    },[bannerGroups])
    console.log(viewAllBanner)
    return (
      <div className="relative">
        <Slider className={styles.contBanner} {...Const.settings} id="slider-primary">
            {viewAllBanner.map(banner =>
                <article key={`HeroBanner_${banner.id}`} className={styles.contIMG}>
                    <figure>
                        <img
                            className={styles.img}
                            alt={banner.alt || banner.name}
                            src={banner.banner.url}/>
                    </figure>
                </article>
            )}
        </Slider>
     </div>
    );
};

export default HeroCards;