export default function Header({ items = [] }) {
    return (
        <nav className='navbar bg-gradient-to-b from-gradientt to-gradientb shadow-md flex-initial'>
            <div className="flex-initial">
                <a href='/' className="
                    btn py-0 text-white btn-ghost hover:bg-transparent normal-case text-4xl tracking-[13.5px] font-caslon uppercase">ADLYCEUM</a>
            </div>
            <div className="flex-auto justify-end sm:justify-end gap-2 font-roboto py-1">
                <ul className="menu menu-horizontal text-white p-0">
                    {items.map((item, index) => (
                        <li key={`Header-nav-item-${index}`}>
                            <a
                                className='hover:bg-transparent hover:underline hover:underline-offset-4 text-2xl'
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