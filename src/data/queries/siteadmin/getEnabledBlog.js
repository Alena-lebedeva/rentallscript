import {
    GraphQLList as List
} from 'graphql';

// Models
import { BlogDetails } from '../../models';

// Types
import BlogDetailsType from '../../types/BlogDetailsType';

const getEnabledBlog = {

    type: new List(BlogDetailsType),

    async resolve({ request }) {

        return await BlogDetails.findAll({
            where: {
                isEnable: true
            }
        });

    }
};

export default getEnabledBlog;

