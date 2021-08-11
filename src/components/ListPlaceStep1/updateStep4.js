// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';

// Redux Action
import { getListingDataStep3 } from '../../actions/getListingDataStep3';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';

async function updateStep3(values, dispatch) {

  let weeklyDiscount = values.weeklyDiscount != '' ? values.weeklyDiscount : 0;
  let monthlyDiscount = values.monthlyDiscount != '' ? values.monthlyDiscount : 0;
  let cleaningPrice = values.cleaningPrice != '' ? values.cleaningPrice : 0;
  // let variables = Object.assign({}, values, { weeklyDiscount, monthlyDiscount, cleaningPrice });

  let id = values.id;
  let houseRules = values.houseRules;
  let bookingNoticeTime = values.bookingNoticeTime;
  let checkInStart = values.checkInStart;
  let checkInEnd = values.checkInEnd;
  let maxDaysNotice = values.maxDaysNotice;
  let minNight = values.minNight;
  let maxNight = values.maxNight;
  let basePrice = values.basePrice;
  let currency = values.currency;
  let blockedDates = values.blockedDates;
  let bookingType = values.bookingType;
  let cancellationPolicy = values.cancellationPolicy;

  let variables = Object.assign({}, {
    weeklyDiscount, monthlyDiscount, cleaningPrice,
    id, houseRules, bookingNoticeTime,
    checkInStart, checkInEnd, maxDaysNotice,
    minNight, maxNight, basePrice,
    currency, blockedDates, bookingType,
    cancellationPolicy
  });

  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $houseRules: [Int],
    $bookingNoticeTime:String,
    $checkInStart:String,
    $checkInEnd:String,
    $maxDaysNotice:String,
    $minNight:Int,
    $maxNight:Int,
    $basePrice:Float,
    $cleaningPrice:Float,
    $currency:String,
    $weeklyDiscount:Int,
    $monthlyDiscount:Int,
    $blockedDates: [String],
    $bookingType: String!,
    $cancellationPolicy: Int,
  ) {
      updateListingStep4 (
        id: $id,
        houseRules: $houseRules,
        bookingNoticeTime:$bookingNoticeTime,
        checkInStart:$checkInStart,
        checkInEnd:$checkInEnd,
        maxDaysNotice:$maxDaysNotice,
        minNight:$minNight,
        maxNight:$maxNight,
        basePrice:$basePrice,
        cleaningPrice:$cleaningPrice,
        currency:$currency,
        weeklyDiscount:$weeklyDiscount,
        monthlyDiscount:$monthlyDiscount,
        blockedDates: $blockedDates,
        bookingType: $bookingType,
        cancellationPolicy: $cancellationPolicy
      ) {
        status
      }
    }`;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (data && data.updateListingStep4 != undefined) {
    if (data.updateListingStep4.status == "success") {

      // await dispatch(getListingDataStep3(values.id));
      history.push('/become-a-host/' + values.id + '/calendar');
      dispatch(getListingDataStep3(values.id));
      await dispatch(manageListingSteps(values.id, 3));
      await dispatch(setLoaderComplete('updateListing'));
      // history.push('/become-a-host/' + values.id + '/calendar');
    } else if (data.updateListingStep4.status == "notLoggedIn") {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.notLoggedIn });
    } else {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.somethingWentWrong });
    }
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default updateStep3;
