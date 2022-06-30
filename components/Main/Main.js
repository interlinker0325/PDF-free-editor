export default function Main({
    title,
    actionItems,
    children,
    className = '',
    user = {},
    ...props
}) {
    return (
        <main className={`${styles.main} ${user.isLoggedIn ? 'py-0' : 'py-12'} ${className}`} {...props}>
            {/* {title &&
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>{title}</h1>
                    {actionItems &&
                        <div className={styles.btnGroup}>
                            {actionItems.length && actionItems.map((actionItem, actionIndex) =>
                                <button
                                    key={`actionItem_${actionItem.text}_${actionIndex}`}
                                    {...actionItem.onClick ? actionItem.onClick : null}
                                    className={`${styles.btn} ${actionIndex === 0 ? 'btn-primary text-white' : ''}`}>
                                    {actionItem.href ?
                                        <a href={actionItem.href}>{actionItem.text}</a> : actionItem.text
                                    }
                                </button>
                            )}
                        </div>
                    }
                </div>
            } */}
            {user.isLoggedIn &&
				<h3 className='text-primary text-2xl self-end pt-3 pb-8'>Bienvenid@ {user.fullname}</h3>
			}
            {children}
        </main>
    );
}

const styles = {
    main: 'flex flex-col px-14 flex-auto font-roboto',
    titleSection: 'flex flex-row justify-between py-4',
    title: 'text-4xl font-bold lowercase',
    btnGroup: 'btn-group shadow-xl',
    btn: 'btn hover:bg-primary hover:text-black'
};
