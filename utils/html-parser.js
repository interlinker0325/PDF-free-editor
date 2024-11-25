export function parser(value) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    const element = doc.body.firstChild;
    return element
  }