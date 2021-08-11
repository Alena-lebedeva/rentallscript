import { SiteSettings } from '../../../data/models';

export async function getSiteLogo() {
    const logoData = await SiteSettings.findOne({
        attributes: ['value'],
        where: {
            title: 'Logo'
        },
        raw: true
    });

    return await logoData && logoData.value;
}