import fetch from '../fetch';

export async function downloadFile(url) {
    const resp = await fetch('/uploadRemoteImage', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url}),
        credentials: 'include'
    });
    const { filename, status } = await resp.json();
    return {
        filename, 
        status
    };
}