import { Reservation, UserProfile, User, Listing, ListingData, ThreadItems } from '../../data/models';
import { sendEmail } from '../email/sendEmail';

export async function emailBroadcast(id, logo) {
  // Get Reservation Data
  const reservation = await Reservation.findOne({
    where: { id }
  });
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

    let reservationId = reservation.id;
    let hostEmail = host.email;
    let hostName = host.profile.firstName;
    let hostLastName = host.profile.lastName;
    let hostProfilePic = host.profile.picture;
    let guestEmail = guest.email;
    let guestName = guest.profile.firstName;
    let guestLastName = guest.profile.lastName;
    let guestProfilePic = guest.profile.picture;

    // Send email to host
    let contentForHost = {
      reservationId,
      guestName,
      guestLastName,
      guestProfilePic,
      logo
    };
    await sendEmail(hostEmail, 'completedHost', contentForHost);

    // Send email to guest
    let contentForGuest = {
      reservationId,
      hostName,
      hostLastName,
      hostProfilePic,
      logo
    };
    await sendEmail(guestEmail, 'completedGuest', contentForGuest);

    return {
      status: 'email is sent'
    };
  } else {
    return {
      status: 'failed to send email'
    }
  }
}