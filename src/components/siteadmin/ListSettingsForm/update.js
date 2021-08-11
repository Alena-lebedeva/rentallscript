// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';

// Redux
import { closeListSettingsModal } from '../../../actions/siteadmin/modalActions';
import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';

async function update(values, dispatch) {

  const query = `
    query (
        $id:Int,
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
          updateListSettings (
            id: $id,
            typeId:$typeId,
            itemName:$itemName,
            itemDescription:$itemDescription,
            otherItemName: $otherItemName,
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

  if (data.updateListSettings.status === "success") {
    dispatch(closeListSettingsModal());
    await dispatch(getAdminListingSettings(values.typeId));
    toastr.success("Update List Settings", "List Settings is updated successfully!");
  } else {
    toastr.error("Update List Settings", "Updating List Settings is failed");
  }

}

export default update;
