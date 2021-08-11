import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import { initialize, getFormValues } from 'redux-form';

import {
    IMPORT_CALENDAR_START,
    IMPORT_CALENDAR_SUCCESS,
    IMPORT_CALENDAR_ERROR,
} from '../../constants';
import { importCalendar } from '../../core/iCal/importCalendar';
import { getListingDataStep3 } from '../getListingDataStep3';

const query = gql`
    query GetCalendars($listId: Int!) {
        getListingCalendars(listId: $listId) {
            id
            name
            url
            listId
            status
        }
    }`;

const mutation = gql`
    mutation BlockImportedDates(
        $listId: Int!, 
        $calendarId: Int!, 
        $blockedDates: [String]
    ) {
        blockImportedDates(
            listId: $listId, 
            calendarId: $calendarId, 
            blockedDates: $blockedDates
        ) {
            status
        }
    }
`;

export function importiCal(listId, name, url, calendarId) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: IMPORT_CALENDAR_START,
            payload: {
                importCalLoading: true
            }
        });

        try {

            const data = {
                listId,
                name,
                url,
                calendarId
            };
            const { status, blockedDates, calendarDataId } = await importCalendar(data);
            if (calendarId) {
                var importCalendarId = calendarId;
            } else {
                var importCalendarId = calendarDataId;
            }
            if (status === 200) {
                toastr.success('Calendar added succesfully!', 'Calendar sync process has started!');
                if (!calendarId) {
                    const { data } = await client.query({
                        query,
                        variables: { listId },
                        fetchPolicy: 'network-only',
                    });
                    if (data && data.getListingCalendars) {
                        dispatch({
                            type: IMPORT_CALENDAR_SUCCESS,
                            payload: {
                                calendars: data.getListingCalendars,
                                importCalLoading: false
                            }
                        });
                    }
                }
                const { data } = await client.mutate({
                    mutation,
                    variables: { listId, calendarId: importCalendarId, blockedDates },
                });
                if (data && data.blockImportedDates) {
                    if (data.blockImportedDates.status === '200') {
                        await dispatch(getListingDataStep3(listId));
                    }
                }
                dispatch({
                    type: IMPORT_CALENDAR_ERROR,
                    payload: {
                        importCalLoading: false
                    }
                });

            } else {
                if (status === 409) {
                    toastr.error('Calendar already exists!', 'Your calendar is already imported!');
                } else {
                    toastr.error('Invalid Calendar!', 'URL is invalid, import calendar failed!');
                }
                dispatch({
                    type: IMPORT_CALENDAR_ERROR,
                    payload: {
                        status,
                        importCalLoading: false
                    }
                });
            }

        } catch (error) {
            dispatch({
                type: IMPORT_CALENDAR_ERROR,
                payload: {
                    error,
                    importCalLoading: false
                }
            });
        }
    };
}