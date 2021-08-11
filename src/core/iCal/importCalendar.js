import fetch from '../fetch';

export async function importCalendar(data) {
    const resp = await fetch('/import-calendar', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data }),
        credentials: 'include'
    });
    return await resp.json();
}