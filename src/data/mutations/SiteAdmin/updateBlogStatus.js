import BlogDetailsType from '../../types/BlogDetailsType';
import { BlogDetails } from '../../models';
import {
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
} from 'graphql';
const updateBlogStatus = {
    type: BlogDetailsType,
    args: {
        id: { type: IntType },
        isEnable: { type: BooleanType },
    },
    async resolve({ request }, {
        id,
        isEnable,
    }) {

        if (request.user && request.user.admin == true) {
            const Update = await BlogDetails.update({
                isEnable: !isEnable,
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
                status: 'failed'
            }
        }
    },
};
export default updateBlogStatus;
