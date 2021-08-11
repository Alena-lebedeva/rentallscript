import StaticPageType from '../../types/siteadmin/StaticPageType';
import { StaticPage } from '../../models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
const updateStaticPage = {
    type: StaticPageType,
    args: {
        id: { type: IntType },
        content: { type: StringType },
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
    },
    async resolve({ request }, {
        id,
        content,
        metaTitle,
        metaDescription,
    }) {

        if (request.user && request.user.admin == true) {
            const update = await StaticPage.update({
                content,
                metaTitle,
                metaDescription

            }, {
                    where: {
                        id: id
                    }
                });
            return {
                status: 'success'
            }


        } else {
            return {
                status: 'Not Logged In'
            }
        }
    },
};
export default updateStaticPage;
