export default function Main({
    title,
    actionItems,
    children,
    className = '',
    ...props
}) {
    return (
        <main className={`${styles.main} ${className}`} {...props}>
            {children}
        </main>
    );
}

const styles = {
    main: 'flex min-h-[90vh] flex-col px-2 flex-auto font-roboto mt-20 lg:mt-22',
    titleSection: 'flex flex-row justify-between py-4',
    title: 'text-4xl font-bold lowercase',
    btnGroup: 'btn-group shadow-xl',
    btn: 'btn hover:bg-primary hover:text-black'
};
