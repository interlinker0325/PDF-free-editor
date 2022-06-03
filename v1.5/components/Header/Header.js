export default function Header({ items = [] }) {
    return (
        <nav className="navbar bg-primary shadow-md">
            <div className="flex-initial">
                <a href='/' className="
                    btn text-white btn-ghost normal-case text-4xl tracking-widest">Adlyceum</a>
            </div>
            <div className="flex-auto justify-end sm:justify-end sm:pr-4 gap-2">
                <ul className="menu menu-horizontal text-white p-0">
                    {items.map((item, index) => (
                        <li key={`Header-nav-item-${index}`}>
                            <a
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