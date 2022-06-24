export default function Footer({ items }) {
    return (
        <footer className="footer items-center p-4 bg-secondary text-black">
            <div className="flex-initial">
                <a className="">Copyright</a>
            </div>
            <div className="flex-auto w-full justify-end sm:pr-4 gap-2">
                <ul className="menu menu-horizontal p-0">
                    {items.map((item, index) => (
                        <li key={`Footer-nav-item-${index}`}>
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
        </footer>
    );
};
