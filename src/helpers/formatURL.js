export function formatURL(data) {
    let convertData = null;
    if (data) {
        convertData = data;
        convertData = convertData.toLowerCase();
        convertData = convertData.replace(new RegExp(', ', 'g'), '--');
        convertData = convertData.replace(new RegExp(' ', 'g'), '-');
        convertData = convertData.replace(new RegExp('/', 'g'), '-');
        convertData = convertData.replace(new RegExp('#', 'g'), '-');
        convertData = convertData.replace(new RegExp('%', 'g'), '-');
        convertData = convertData.replace(/\?/g, '-');
        convertData = convertData.replace(/\\/g, "-")
    }

    return convertData;
}

export function resetURL(data) {
    let convertData = null;
    if (data) {
        convertData = data;
        convertData = convertData.replace(new RegExp('--', 'g'), ', ');
        convertData = convertData.replace(new RegExp('-', 'g'), ' ');
        convertData = convertUpperCase(convertData);
        if (convertData.indexOf(', ') >= 0) {
            convertData = convertCountryCode(convertData);
        }

    }

    return convertData;
}

export function convertUpperCase(requestData) {
    let data, convertData = [];
    if (requestData) {
        data = requestData.split(' ');
        for (var x = 0; x < data.length; x++) {
            convertData.push(data[x].charAt(0).toUpperCase() + data[x].slice(1));
        }

        return convertData.join(' ');
    } else {
        return null;
    }
}

export function convertCountryCode(requestData) {
    let data, convertData = [];
    if (requestData) {
        data = requestData.split(', ');
        for (var x = 0; x < data.length; x++) {
            if (data[x].toLowerCase() === 'uk') {
                convertData.push(data[x].toUpperCase());
            } else if (x === (data.length - 1)) {
                convertData.push(data[x]);
            } else {
                convertData.push(data[x] + ', ');
            }
        }

        return convertData.join('');
    } else {
        return null;
    }
}


