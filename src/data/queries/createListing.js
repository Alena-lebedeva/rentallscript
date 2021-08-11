// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import CreateListingType from '../types/CreateListingType';

// Sequelize models
import { Listing, UserListingData, BedTypes } from '../../data/models';

import fetch from '../../core/fetch';

const createListing = {

  type: CreateListingType,

  args: {
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
    bedTypes: { type: StringType },
  },

  async resolve({ request, response }, {
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
    bedTypes
  }) {

    if (request.user && request.user.admin != true) {

      const address = street + ", " + city + ", " + state + ", " + country + ", " + zipcode;

      const query = `
        query ($address: String) {
          locationItem(address: $address) {
            street
            city
            state
            country
            zipcode
            lat
            lng
          }
        }
      `;

      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: { address: address }
        }),
        credentials: 'include',
      });

      const { data } = await resp.json();

      let latValue = lat;
      let lngValue = lng;

      if (data.locationItem != null) {
        latValue = data.locationItem.lat;
        lngValue = data.locationItem.lng;
      }

      const doCreateListing = await Listing.create({
        userId: request.user.id,
        residenceType: residenceType,
        bedrooms: bedrooms,
        beds: beds,
        personCapacity: personCapacity,
        bathrooms: bathrooms,
        country: country,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        zipcode: zipcode,
        lat: latValue,
        lng: lngValue
      });



      if (doCreateListing) {

        // Recently added list id
        const id = doCreateListing.dataValues.id;

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

        // Assign other settings values in here
        let otherListSettings = [
          { settingsId: roomType, listId: id },
          { settingsId: houseType, listId: id },
          { settingsId: buildingSize, listId: id },
          { settingsId: bedType, listId: id },
          { settingsId: bathroomType, listId: id }
        ];

        // Bulk create on UserListingData to store other settings of this listingSteps
        const createOtherSettings = await UserListingData.bulkCreate(otherListSettings);

        return {
          status: "success",
          id: id
        };
      } else {
        return {
          status: "failed",
        };
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default createListing;
