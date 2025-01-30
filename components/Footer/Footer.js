// Styles 
import styles from './styles'

export default function Footer() {
    return (
        <footer className={styles.contFooter}>
            <a className='text-white'> Copyright &copy; {(new Date()).getFullYear()} Adlyceum.</a>
        </footer>
    );
};
