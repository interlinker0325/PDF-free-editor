export default function LoginForm (props) {
    return (
        <form className={styles.form} {...props}>
            <div className={styles.inputGroup}>
                <input type='text' placeholder='first name' className={styles.inputGroupInput} />
                <input type='text' placeholder='last name' className={styles.inputGroupInput} />
            </div>
            <input type='email' placeholder='email' className={styles.input} />
            <input type='password' placeholder='password' className={styles.input} />
            <button type='submit' className={styles.button}>register</button>
        </form>
    );
}

const styles = {
    form: 'mt-4 mb-8',
    input: 'input text-primary input-bordered input-primary w-full max-w-xs my-2',
    inputGroup: 'mx-auto flex flex-row justify-center my-2 max-w-xs',
    inputGroupInput: 'input text-primary input-bordered input-primary w-1/2',
    button: 'btn hover:btn-primary w-2/3 my-2'
}