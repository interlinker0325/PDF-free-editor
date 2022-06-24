// import HeroCard from 'components/HeroCards/HeroCard';

const HeroCards = () => {
    return (
        <section className='grid grid-cols-7 gap-4 h-40'>
            <article className='card col-start-1 col-end-4 flex'>
                <figure><img src='logo_ucr.png'/></figure>
            </article>
            <article className='card bg-secondary text-center text-black col-start-4 col-end-6 flex'>
                segundo
                <figure></figure>
            </article>
            <article className='card bg-secondary text-center text-black col-start-6 col-end-8 flex'>
                tercero
                <figure></figure>
            </article>
        </section>
    );
};

export default HeroCards;