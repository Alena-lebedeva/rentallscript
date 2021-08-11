import { UserProfile, Country } from '../../../../data/models';

export async function updateVerificationCode(verificationCode, userId) {
    const verification = await UserProfile.update({
        verificationCode
    },
        {
            where: {
                userId
            }
        });
    if (verification) {
        return {
            status: 'success'
        };
    } else {
        return {
            status: 'failed'
        }
    }
}

export async function getCountryCode(dialCode) {
    const country = await Country.findOne(
        {
            where: {
                dialCode
            },
            raw: true
        });

    if (country) {
        return country.countryCode;
    } else {
        return 'US';
    }
}

