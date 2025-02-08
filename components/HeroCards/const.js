export default {
  settings: {
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplaySpeed: 10000,
    speed: 6000,
    appendArrows: '$(#slider-primary)',
    dots: true,
    arrows: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 916,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  },
}