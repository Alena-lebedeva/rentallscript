import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

// Models
import { BlogDetails } from '../../models';

// Types
import BlogDetailsType from '../../types/BlogDetailsType';

const editBlogDetails = {

    type: BlogDetailsType,

    args: {
        id: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { id }) {

        // Get All User Profile Data
        const blogData = await BlogDetails.find({
            where: {
                id: id
            }
        });

        return blogData;

    },
};

export default editBlogDetails;

/*

query editBlogDetails ($id: Int!) {
    editBlogDetails (id: $id) {
        id
        metaTitle
        metaDescription
        pageUrl
        pageTitle
        content
        footerCategory
        isEnable
        createdAt
    }
}

*/
