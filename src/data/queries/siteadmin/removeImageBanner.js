import ImageBannerType from '../../types/ImageBannerType';
import { ImageBanner } from '../../../data/models';

const removeImageBanner = {

  type: ImageBannerType,

  async resolve({ request }) {

    if(request.user && request.user.admin == true) {
       let isImageRemoved = false;

       // Site Name
       const updateImage = await ImageBanner.update({ 
         image: null
        },
        {
          where: {
            id: 1
          }
        })
       .then(function(instance){
         // Check if any rows are affected
         if(instance > 0) {
           isImageRemoved = true;
         } else {
            isImageRemoved = false;
         }
       });

       if(isImageRemoved) {
         return {
           status: 'success'
         }
       } else {
           return {
             status: 'failed'
           }
       }

     } else {
         return {
           status: 'notLoggedIn'
         }
     }

  },
};

export default removeImageBanner;
