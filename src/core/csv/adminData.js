import { 
    User, 
    UserProfile, 
    Listing,
    ListingData
} from '../../data/models';
import sequelize from '../../data/sequelize';
import moment from 'moment';

export async function users(keyword, userType) {
    let dataItems = [];
    let userTypeFilter = {}, keywordFilter = {};

    if (userType === '1') {
        userTypeFilter = {
            id: {
                $notIn: [sequelize.literal(`SELECT DISTINCT userId FROM Listing`)]
            }
        }
    } else if (userType === '2') {
        userTypeFilter = {
            id: {
                $in: [sequelize.literal(`SELECT DISTINCT userId FROM Listing`)]
            }
        }
    }

    if (keyword && keyword.length > 0 && keyword.toString().trim() != '') {
        let getDate = moment(keyword).format('YYYY-MM-DD');

        keywordFilter = {
          id: {
            $or: [{
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${keyword}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE lastName like '%${keyword}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE phoneNumber like '%${keyword}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE createdAt like '%${getDate}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${keyword}%'`)]
            }]
          }
        }
      }


    const data = await User.findAll({
        where: {
            $and: [
                { userDeletedAt: null },
                userTypeFilter,
                keywordFilter
            ]
        },
        include: [
            { model: UserProfile, as: 'profile' }
        ],
        raw: true
    });
    
    if(data && data.length > 0) {
        await Promise.all(data.map((item) => {
                let consolidatedData = Object.assign( 
                    { 
                        Email: item.email, 
                        EmailConfirmed: item.emailConfirmed,
                        Type: item.type
                    },
                    item.profile && item.profile.dataValues || {}
                );
                dataItems.push(consolidatedData);
        }));
    }

    return await dataItems;
}

export async function reservations() {
    let dataItems = [];
    const data = await sequelize.query(`SELECT 
        Reservation.*, User.email as HostEmail, GuestUser.email as GuestEmail 
        from Reservation, User, User as GuestUser 
        where Reservation.hostId=User.id and Reservation.guestId=GuestUser.id`, 
        { type: sequelize.QueryTypes.SELECT }
    );
    
    if (data && data.length > 0) {
        data.map(async (item) => {
            let consolidatedData = Object.assign(
                item,
            );
            dataItems.push(consolidatedData);
        })
    }
    return dataItems;
}

export async function listings() {
    let dataItems = [];
    const data = await Listing.findAll({
        include: [
            { model: ListingData, as: 'listingData' },
            { model: User, as: 'user' }
        ]
    });
    if (data && data.length > 0) {
        data.map((item) => {
            let listingOtherData = item.listingData ? item.listingData.dataValues : {};
            let hostEmail = item.user ? item.user.dataValues.email : {}
            let consolidatedData = Object.assign(
                item.dataValues,
                { hostEmail },
                { listingData: ''},
                { user: '' },
                listingOtherData
            );
            dataItems.push(consolidatedData);
        })
    }
    return dataItems;
}