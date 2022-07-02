// Constants
export const regex = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /[\+\(]{0,2}\d{1,4}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}/,
    string: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    hyperLynk: /^(http: \/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    month: new RegExp(`^(0[1-9]|1[0-2])$`),
    year: new RegExp(`^([0-9][0-9])$`),
    amexCard: new RegExp('^(?:3[47][0-9]{13})$'),
    script: new RegExp(`<script[^<]*</script>`, 'g')
};

export const isBrowser = (typeof window !== 'undefined');

// Functions
export const isTheSameObject = (object1, object2) => JSON.stringify(Object.values(object1).sort()) === JSON.stringify(Object.values(object2).sort());

export const isTheSameArray = (arr1, arr2) => (arr1 && arr2) && (arr1.length === arr2.length) && arr1.every(value1 => arr2.some((value2) => isTheSameObject(value1, value2)));

export const objectHasValues = (object1) => object1 && Object.values(object1).length > 0 && Object.values(object1).every(value => value !== undefined);

export const arrayHasValues = (arr) => (arr && Array.isArray(arr) && arr.length > 0) ? true : false;

export const downloadToCSV = (fileName, data, isBlob = true) => {
    let a = document.createElement('a');

    if (isBlob) {
        const file = new Blob([data], { type: 'text/csv;charset=utf-8;' })
        a.href = window.URL.createObjectURL(file);;
        a.download = `${fileName}-${Date.now()}.csv`;
    } else {
        a.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
        a.download = fileName;
    }

    a.click();
};

export const isOdd = (num) => num % 2;

export * from './user';
export * from './post';