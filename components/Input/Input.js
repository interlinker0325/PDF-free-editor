import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

const TextInput = (props) => (
    <input
        className={`${styles.text} ${props.error ? styles.inputError : ''}`}
        type={props.type}
        name={props.name}
        placeholder={props.label}
        value={props.value}
        onChange={e => props.onChange(e, props.name)} />
);

const Select = (props) => (
    <select
        className={styles.select}
        value={props.value}
        name={props.name}
        onChange={e => props.onChange(e, props.name)}>
        <option value='default'>{props.label}</option>
        {props.options.map(opt =>
            <option
                key={`select_${props.name}_${opt.id}`}
                value={opt.id}>
                {opt.title || `${opt.name} ${opt.lastname}`}
            </option>
        )}
    </select>
);

const File = React.forwardRef((props, ref) => (
    <div>
        <input
            className={`${styles.file} ${props.error ? styles.inputError : ''}`}
            type={props.type}
            name={props.name}
            id={props.name}
            ref={ref}
            onChange={e => props.onChange(e, props.name)}
            {...props.multiple ? { multiple: true } : {}}/>
        <span htmlFor={props.name} className={styles.fileLabel}>{props.label}</span>
    </div>
));

const Textarea = (props) => (
    <textarea
        className={`${styles.textarea} ${props.error ? styles.inputError : ''}`}
        placeholder={props.label}
        value={props.value}
        name={props.name}
        onChange={e => props.onChange(e, props.name)} />
);

const Checkbox = React.forwardRef((props, ref) => (
    <label className={styles.label}>
        <input
            className={`${styles.checkbox} ${props.error ? styles.inputError : ''}`}
            type={props.type}
            ref={ref}
            checked={props.value}
            onChange={e => props.onChange(e, props.name)} />
        <span className='label-text'>{props.label}</span>
    </label>
));

export const Input = React.forwardRef((props, ref) => {
    const components = {
        text: TextInput,
        textarea: Textarea,
        select: Select,
        file: File,
        checkbox: Checkbox
    };
    const Component = components[props.type];

    return props.icon ? (
        <label className={`${styles.label} ${props.error ? styles.inputError : ''}`}>
            <FontAwesomeIcon className={styles.icon} icon={Icons[props.icon]} />
            <Component { ...props } {...ref ? { ref } : {}} />
        </label>
    ) : <Component { ...props } {...ref ? { ref } : {}} />;
});

const styles = {
    text: 'input text-2xl input-ghost border-transparent rounded-none w-full border-b-black',
    inputError: 'text-error border-error',
    label: 'cursor-pointer label justify-start gap-4',
    icon: 'label-text w-8 h-8 text-sm',
    select: 'select text-sm h-8 min-h-8 w-full max-w-xs pl-0 border-2 border-transparent rounded-none border-b-black',
    file: 'input hidden input-ghost w-full',
    fileLabel: 'label-text border-2 border-transparent py-2 rounded-none border-b-black',
    textarea: 'textarea rounded-none resize-none bg-secondary w-full h-1/2',
    checkbox: 'checkbox checkbox-secondary',
    button: (type) => `btn btn-${type} rounded-full`
};
