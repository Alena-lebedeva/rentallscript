import { UserProfile } from '../../../../data/models';

export async function getCustomerId(
    userId
) {
    // Find Customer Id from UserProfile 
    const profile = await UserProfile.findOne({
        where: {
            userId
        }
    });

    if (profile) {
        return profile.stripeCusId;
    } else {
        return null;
    }
}