import BlogDetailsType from '../../types/BlogDetailsType';
import { BlogDetails } from '../../../data/models';
import {
    GraphQLString as StringType
} from 'graphql';
const addBlogDetails = {
    type: BlogDetailsType,
    args: {
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
        pageUrl: { type: StringType },
        pageTitle: { type: StringType },
        content: { type: StringType },
        footerCategory: { type: StringType },
    },
    async resolve({ request }, {
        metaTitle,
        metaDescription,
        pageUrl,
        pageTitle,
        content,
        footerCategory,
    }) {

        let pageURLCheck = pageUrl.trim();

        if (request.user && request.user.admin == true) {
            const checkUrl = await BlogDetails.findOne({
                where: {
                    pageUrl: pageURLCheck
                }
            })
            if (checkUrl) {
                return {
                    status: 'URL exist'
                }
            } else {
                const createBlog = await BlogDetails.create({
                    metaTitle,
                    metaDescription,
                    pageUrl,
                    pageTitle,
                    footerCategory,
                    content: content
                });
                return {
                    status: 'success'
                }
            }

        } else {
            return {
                status: 'failed'
            }
        }
    },
};
export default addBlogDetails;
