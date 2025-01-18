import styles from './styles'

export default function Logo({ size = '240', ...props }) {
    return (
        <figure {...props}>
            <img className={styles.img} src='/logo.png' alt='logo' />
        </figure>
    );
}
