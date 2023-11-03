import { useRouter } from 'next/router';
import Logo from "../Logo/Logo";

export default function Header({ items = [] }) {
    const router = useRouter();
    return (
        <nav className='navbar px-14 bg-gradient-to-b from-gradientt to-gradientb shadow-md flex-initial'>
                <div className='flex-initial'>
                    <Logo/>
                </div>
            <div className='flex-auto justify-end sm:justify-end gap-2 font-roboto py-1'>
                <ul className='menu menu-horizontal text-white p-0 mr-[-16px]'>
                    {items.map((item, index) => (
                        <li key={`Header-nav-item-${index}`}>
                            <a
                                className={`${router.asPath === item.action ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'} font-light decoration-1 hover:bg-transparent text-2xl`}
                                {...item.onClick ?
                                    { onClick: item.onClick } : { href: item.action }
                                }>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
