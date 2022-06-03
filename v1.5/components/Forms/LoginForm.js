import { Component } from 'react';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e, label) {
        this.setState({ [label]: e.target.value });
    }

    render() {
        const {
            onSubmit,
            ...props
        } = this.props;

        return (
            <form onSubmit={(e) => onSubmit(e, this.state)} className={styles.form} {...props}>
                <input
                    type='text'
                    placeholder='email'
                    className={styles.input}
                    value={this.state.email}
                    onChange={(e) => this.onChange(e, 'email')} />

                <input
                    type='password'
                    placeholder='password'
                    className={styles.input}
                    value={this.state.password}
                    onChange={(e) => this.onChange(e, 'password')} />

                <button type='submit' className={styles.button}>login</button>
            </form>
        );
    }
}

const styles = {
    form: 'mt-2 mb-8',
    input: 'input text-primary input-bordered input-primary w-full max-w-xs my-2',
    button: 'btn hover:btn-primary w-1/2 my-2'
}