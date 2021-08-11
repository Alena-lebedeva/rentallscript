import {
    GraphQLInt as IntType,
} from 'graphql';

// Models
import { StaticPage } from '../../models';

// Types
import StaticPageType from '../../types/siteadmin/StaticPageType';

const getEditStaticPage = {

    type: StaticPageType,

    args: {
        id: { type: IntType },
      },

    async resolve({ request }, {id}) {

        return await StaticPage.findOne({
            where: {
                id
            }
        });

    }
};

export default getEditStaticPage;