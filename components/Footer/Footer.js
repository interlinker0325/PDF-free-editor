export default function Footer() {
    return (
        <footer className=' fixed footer bottom-0 w-full items-center p-2 px-14 bg-secondary text-black flex-initial z-20'>
            <a className='font-caslon text-4xl'> Copyright &copy; {(new Date()).getFullYear()} Adlyceum.</a>
        </footer>
    );
};
