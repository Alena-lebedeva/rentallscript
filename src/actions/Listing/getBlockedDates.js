import { gql } from 'react-apollo';

import {
    GET_BLOCKED_DATE_START,
    GET_BLOCKED_DATE_SUCCESS,
    GET_BLOCKED_DATE_ERROR,
} from '../../constants';

const query = gql`
    query ($listId: Int!, $filterDate: String) {
        getBlockedDatesCalendar(listId: $listId, filterDate: $filterDate) {
            listId
            blockedDates
        }
    }
`;

export function getBlockedDates(listId, filterDate) {

    return async(dispatch, getState, {client}) => {
        dispatch({
            type: GET_BLOCKED_DATE_START, 
            payload: {
                loading: true
            }
        });

        try {
            const { data } = await client.query({
                query,
                variables: {
                  listId,
                  filterDate
                },
            });

            dispatch({
                type: GET_BLOCKED_DATE_SUCCESS, 
                payload: {
                    loading: false
                }
            });

            return {
                data
            };
        } catch (error) {
            dispatch({
                type: GET_BLOCKED_DATE_ERROR, 
                payload: {
                    error
                }
            });
        }

        return false;
    };
}