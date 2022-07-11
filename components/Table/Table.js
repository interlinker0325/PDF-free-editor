export default function Table({ items, columns }) {
    const renderBodyItem = (item, itemIndex) => {
        const itemUrl = global.window ? `${window?.location?.pathname}/${item.id}` : null;
        return (
            <tr key={`${item}_${itemIndex}`}>
                <td>
                    <label>
                        <input type='checkbox' className={styles.checkbox} />
                    </label>
                </td>
                {columns && columns.map((column, columnIndex) =>
                    !item[column] ? null :
                        column === 'thumbnail' ?
                        <td key={`${item}_${column}_${columnIndex}`}>
                            <a href={itemUrl}>
                                <div className='avatar'>
                                    <div className='mask mask-squircle w-12 h-12'>
                                        <img src={item.thumbnail.url} alt='Avatar user' />
                                    </div>
                                </div>
                            </a>
                        </td>
                        :
                        <td key={`${item}_${column}_${columnIndex}`}>
                            <a href={itemUrl}>{item[column].toString()}</a>
                        </td>
                )}
            </tr>
        );
    };

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type='checkbox' className={styles.checkbox} />
                            </label>
                        </th>
                        {columns && columns.map((column, columnIndex) =>
                            <th key={`${column}_${columnIndex}_header`}>{column}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {items && items.map(renderBodyItem)}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        {columns && columns.map((column, columnIndex) =>
                            <th key={`${column}_${columnIndex}_footer`}>{column}</th>
                        )}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

const styles = {
    tableWrapper: 'overflow-x-auto w-full card shadow-xl',
    table: 'table w-full',
    checkbox: 'checkbox',
    avatar: ''
};