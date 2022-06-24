export const log = (message, object = () => { }, err = false) => {
    console.group(`[@blog-www]@%c${key}`, 'color: blue;');

    if (message) console.log(`${err ? '%cERROR: ' : '%c'}${message}`, `color: ${err ? 'red' : 'green'};`);
    if (!(typeof object === 'function')) console.log(`${typeof object} =>`, JSON.parse(JSON.stringify(object)));

    console.groupEnd();
};