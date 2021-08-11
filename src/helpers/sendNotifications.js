
// Fetch request
import fetch from '../core/fetch';
export async function sendNotifications(content, userId) {



    const resp = await fetch('/push-notification', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            userId
        }),
        credentials: 'include'
    });

    const { status, errorMessge } = resp.json;

    return await {
        status,
        errorMessge
    };

}

export default {
    sendNotifications
}
