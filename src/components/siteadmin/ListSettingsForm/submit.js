// Fetch Request
import fetch from '../../../core/fetch';


// Toaster
import { toastr } from 'react-redux-toastr';

// Redux
import { closeListSettingsModal } from '../../../actions/siteadmin/modalActions';
import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';

async function submit(values, dispatch) {

  const query = `
    query (
        $typeId:Int,
        $itemName:String,
        $itemDescription:String,
        $otherItemName:String,
        $maximum:Int,
        $minimum:Int,
      	$startValue:Int,
        $endValue:Int,
      	$isEnable: String,
      ) {
          addListSettings (
            typeId:$typeId,
            itemName:$itemName,
            itemDescription:$itemDescription,
            otherItemName:$otherItemName,
            maximum: $maximum,
            minimum: $minimum,
            startValue: $startValue,
            endValue: $endValue,
            isEnable: $isEnable
          ) {
            status
          }
        }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.addListSettings.status === "success") {
    dispatch(closeListSettingsModal());
    dispatch(getAdminListingSettings(values.typeId));
    toastr.success("Add List Settings", "List Setting is created successfully!");
  } else {
    toastr.error("Add List Settings", "Creating List Setting is failed");
  }

}

export default submit;
