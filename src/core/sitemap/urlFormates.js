import {
    Listing
} from '../../data/models';
import { formatURL } from '../../helpers/formatURL';

export async function listingURLs() {
    let dataItems = [];
    const data = await Listing.findAll({
        where: {
            isPublished: true
        },
        raw: true
    });

    if (data && data.length > 0) {
        await Promise.all(data.map(async (item) => {
            let title = formatURL(item.title);
            let listingURLData = "/rooms/" + title + '-' + item.id;
            dataItems.push(listingURLData);
        }));
    }
    return dataItems;
}


export async function listURLs() {
    let dataItems = [];
    const data = await Listing.findAll({
        where: {
            isPublished: true
        },
        raw: true
    });

    if (data && data.length > 0) {
        await Promise.all(data.map(async (item) => {
            let listingURLData = "/rooms/" + item.id;
            dataItems.push(listingURLData);
        }));
    }
    return dataItems;
}


