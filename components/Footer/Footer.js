export default function Footer() {
    return (
        <footer className='footer bottom-0 w-full items-center p-8 px-14 bg-secondary text-black flex-initial'>
            <a className='font-caslon text-4xl'> Copyright &copy; {(new Date()).getFullYear()} Adlyceum.</a>
        </footer>
    );
};
