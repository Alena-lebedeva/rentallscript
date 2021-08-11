// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';

// Sequelize models
import {
  Listing,
  UserAmenities,
  UserSafetyAmenities,
  UserSpaces,
  UserListingData,
  BedTypes
} from '../../data/models';

const updateListing = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    roomType: { type: StringType },
    houseType: { type: StringType },
    residenceType: { type: StringType },
    bedrooms: { type: StringType },
    buildingSize: { type: StringType },
    bedType: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    bathroomType: { type: StringType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    isMapTouched: { type: BooleanType },
    amenities: { type: new List(IntType) },
    safetyAmenities: { type: new List(IntType) },
    spaces: { type: new List(IntType) },
    bedTypes: { type: StringType },
  },

  async resolve({ request, response }, {
    id,
    roomType,
    houseType,
    residenceType,
    bedrooms,
    buildingSize,
    bedType,
    beds,
    personCapacity,
    bathrooms,
    bathroomType,
    country,
    street,
    buildingName,
    city,
    state,
    zipcode,
    lat,
    lng,
    isMapTouched,
    amenities,
    safetyAmenities,
    spaces,
    bedTypes
   }) {

    let isListUpdated = false;

    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

      const doUpdateListing = await Listing.update({
        residenceType: residenceType,
        bedrooms: bedrooms,
        bedType: bedType,
        beds: beds,
        personCapacity: personCapacity,
        bathrooms: bathrooms,
        country: country,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        zipcode: zipcode,
        lat: lat,
        lng: lng,
        isMapTouched: isMapTouched
      },
        {
          where
        })
        .spread(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListUpdated = true;
          }
        });

      // User Settings Data
      if (isListUpdated) {
        const removeUserSettingsData = await UserListingData.destroy({
          where: {
            listId: id
          }
        });

        let otherListSettings = [
          { settingsId: roomType, listId: id },
          { settingsId: houseType, listId: id },
          { settingsId: buildingSize, listId: id },
          { settingsId: bedType, listId: id },
          { settingsId: bathroomType, listId: id }
        ];

        // Bulk create on UserListingData to store other settings of this listingSteps
        const createOtherSettings = await UserListingData.bulkCreate(otherListSettings);

        // Amenities
        if (amenities != null && amenities != undefined) {
          const removeAmenities = await UserAmenities.destroy({
            where: {
              listId: id
            }
          });
          amenities.map(async (item, key) => {
            let updateAmenities = await UserAmenities.create({
              listId: id,
              amenitiesId: item
            })
          });
        }

        // Safety Amenities
        if (safetyAmenities != null && safetyAmenities != undefined) {
          const removeSafetyAmenities = await UserSafetyAmenities.destroy({
            where: {
              listId: id
            }
          });
          safetyAmenities.map(async (item, key) => {
            let updateSafetyAmenities = await UserSafetyAmenities.create({
              listId: id,
              safetyAmenitiesId: item
            })
          });
        }

        // Spaces
        if (spaces != null && spaces != undefined) {
          const removeSpaces = await UserSpaces.destroy({
            where: {
              listId: id
            }
          });
          spaces.map(async (item, key) => {
            let updateUserSpaces = await UserSpaces.create({
              listId: id,
              spacesId: item
            })
          });
        }

        let bedTypeData;
        if (bedTypes && bedTypes.length > 0) {

          bedTypeData = JSON.parse(bedTypes);

          // items included
          if (bedTypeData != null && bedTypeData != undefined) {

            const removeBedTypes = await BedTypes.destroy({
              where: {
                listId: id
              }
            });

            await Promise.all(bedTypeData.map(async (item, key) => {
              let updateBedTypes = await BedTypes.create({
                listId: id,
                bedCount: item.bedCount,
                bedType: item.bedType
              })
            })
            );
          }
        }
        
      }




      if (isListUpdated) {
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
        status: "notLoggedIn",
      };
    }

  },
};

export default updateListing;
