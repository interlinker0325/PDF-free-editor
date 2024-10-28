export const INPUT_TYPES = {
    EMAIL: 'email',
    PASSWORD: 'password',
    FULLNAME: 'fullname',
    PHONE: 'phone',
    BIRTHDATE: 'birthdate',
    GENDER: 'gender',
    RESIDENCE: 'residence',
    LEVEL: 'level',
    EXPERIENCE: 'experience'
}

const ERROR_MSGS = {
    [INPUT_TYPES.EMAIL]: {
        REQUIRED: 'El correo electrónico es requerido. Por favor intentar nuevamente',
        INVALID: 'Correo electrónico invalido. Por favor intentar nuevamente'
    },
    [INPUT_TYPES.PASSWORD]: {
        REQUIRED: 'La contraseña es requerida. Por favor intentar nuevamente'
    },
    [INPUT_TYPES.FULLNAME]: {
        REQUIRED: 'El nombre completo es requerido. Por favor intentar nuevamente'
    },
    [INPUT_TYPES.PHONE]: {
        REQUIRED: 'El teléfono es requerido. Por favor intentar nuevamente',
        LENGTH: 'El teléfono debe de ser de 8 dígitos. Por favor intentar nuevamente'
    },
    [INPUT_TYPES.BIRTHDATE]: {
        REQUIRED: 'La fecha de nacimiento es requerida. Por favor intentar nuevamente'
    },
    [INPUT_TYPES.GENDER]: {
        REQUIRED: 'El género es requerido. Por favor intentar nuevamente'
    },
    [INPUT_TYPES.RESIDENCE]: {
        REQUIRED: 'La residencia es requerida. Por favor intentar nuevamente'
    },
    [INPUT_TYPES.LEVEL]: {
        REQUIRED: 'La carrera/universida/nivel es requerida. Por favor intentar nuevamente'
    },
    [INPUT_TYPES.EXPERIENCE]: {
        REQUIRED: 'La experiencia laboral es requerida. Por favor intentar nuevamente'
    }
}


const validateEmail = (email) => {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

export const verifyField = (field = {}) => {
    const error = {};
    switch (field.field) {
        case INPUT_TYPES.EMAIL:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.EMAIL;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            } else if (!validateEmail(field.value)) {
                error.field = INPUT_TYPES.EMAIL;
                error.msg = ERROR_MSGS[error.field].INVALID;
            }
            break;

        case INPUT_TYPES.PASSWORD:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.PASSWORD;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            }
            break;

        case INPUT_TYPES.FULLNAME:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.FULLNAME;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            }
            break;

        case INPUT_TYPES.PHONE:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.PHONE;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            } else if (field.value?.length < 8) {
                error.field = INPUT_TYPES.PHONE;
                error.msg = ERROR_MSGS[error.field].LENGTH;
            }
            break;

        case INPUT_TYPES.BIRTHDATE:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.BIRTHDATE;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            }
            break;

        case INPUT_TYPES.GENDER:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.GENDER;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            }
            break;

        case INPUT_TYPES.RESIDENCE:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.RESIDENCE;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            }
            break;

        case INPUT_TYPES.LEVEL:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.LEVEL;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            }
            break;

        case INPUT_TYPES.EXPERIENCE:
            if (field.required && field.value?.length <= 1) {
                error.field = INPUT_TYPES.EXPERIENCE;
                error.msg = ERROR_MSGS[error.field].REQUIRED;
            }
            break;

    }

    return error.field ? error : null;
};

export const verifyMutipleFields = (fields) => {
    for (let x = 0; fields.length > 0; x++) {
        const test = verifyField(fields[x]);
        if (test) {
            return test;
        }

        if (x === fields.length - 1) {
            return false;
        }
    }
};
