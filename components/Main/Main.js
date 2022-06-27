export default function Main({ title, actionItems, children, ...props }) {
    return (
        <main className={styles.main} {...props}>
            {title &&
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
            }
            {children}
        </main>
    );
}

const styles = {
    main: 'flex flex-col p-8 flex-auto font-roboto',
    titleSection: 'flex flex-row justify-between py-4',
    title: 'text-4xl font-bold lowercase',
    btnGroup: 'btn-group shadow-xl',
    btn: 'btn hover:bg-primary hover:text-black'
};
