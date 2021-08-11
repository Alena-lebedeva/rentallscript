import { Reservation, UserProfile, User, Listing, ListingData, ThreadItems, SiteSettings } from '../../data/models';
import { sendEmail } from '../email/sendEmail';

export async function emailBroadcast(id) {
  // Get Reservation Data
  const reservation = await Reservation.findOne({
    where: { id }
  });

  let emailLogo, getEmailLogo;
  getEmailLogo = await SiteSettings.findOne({
    where: {
      title: 'Email Logo'
    },
    raw: true
  });

  emailLogo = getEmailLogo && getEmailLogo.value

  if (reservation) {
    // Get Host Data
    const host = await User.findOne({
      where: {
        id: reservation.hostId,
      },
      include: [
        {
          model: UserProfile,
          as: 'profile'
        }
      ]
    });
    // Get Guest Data
    const guest = await User.findOne({
      where: {
        id: reservation.guestId,
      },
      include: [
        {
          model: UserProfile,
          as: 'profile'
        }
      ]
    });
    // Get List Data
    const list = await Listing.findOne({
      where: {
        id: reservation.listId
      },
      include: [
        {
          model: ListingData,
          as: 'listingData'
        }
      ]
    });


    // Get Thread Data
    const threadData = await ThreadItems.findOne({
      where: { reservationId: id }
    });

    let reservationId = reservation.id;
    let confirmationCode = reservation.confirmationCode;
    let hostEmail = host.email;
    let hostName = host.profile.firstName;
    let guestEmail = guest.email;
    let guestName = guest.profile.firstName;
    let guestLastName = guest.profile.lastName;
    let guestLocation = guest.profile.location;
    let guestProfilePic = guest.profile.picture;
    let guestJoinedDate = guest.profile.createdAt;
    let checkIn = reservation.checkIn;
    let checkOut = reservation.checkOut;
    let guests = reservation.guests;
    let listTitle = list.title;
    let listCity = list.city;
    let allowedCheckInTime = list.listingData.checkInStart;
    let allowedCheckOutTime = list.listingData.checkInEnd;
    let basePrice = reservation.basePrice;
    let total = reservation.total;
    let hostServiceFee = reservation.hostServiceFee;
    let currency = reservation.currency;
    let threadId;
    if (threadData) {
      threadId = threadData.threadId;
    }
    // For Booking Request
    if (reservation.reservationState === 'pending') {

      // Send email to host
      let contentForHost = {
        reservationId,
        confirmationCode,
        hostName,
        guestName,
        checkIn,
        checkOut,
        listTitle,
        basePrice,
        total,
        hostServiceFee,
        threadId,
        currency,
        logo: emailLogo
      };
      await sendEmail(hostEmail, 'bookingRequest', contentForHost);

      // Send email to guest
      let contentForguest = {
        reservationId,
        confirmationCode,
        hostName,
        guestName,
        checkIn,
        listTitle,
        threadId,
        logo: emailLogo
      };
      await sendEmail(guestEmail, 'bookingRequestGuest', contentForguest);
    }

    if (reservation.reservationState === 'approved') {
      // Send email to host
      let contentForHost = {
        reservationId,
        threadId,
        confirmationCode,
        guestName,
        guestLastName,
        guestLocation,
        guestProfilePic,
        guestJoinedDate,
        checkIn,
        checkOut,
        guests,
        allowedCheckInTime,
        allowedCheckOutTime,
        logo: emailLogo
      };
      await sendEmail(hostEmail, 'bookingConfirmedToHost', contentForHost);

      // Send email to guest
      let contentForguest = {
        reservationId,
        hostName,
        guestName,
        listTitle,
        listCity,
        threadId,
        logo: emailLogo
      };
      await sendEmail(guestEmail, 'bookingConfirmedToGuest', contentForguest);
    }


    return {
      status: 'email is sent'
    };
  } else {
    return {
      status: 'failed to send email'
    }
  }
}