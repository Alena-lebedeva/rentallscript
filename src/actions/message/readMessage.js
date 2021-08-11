import { gql } from 'react-apollo';

import {
  READ_MESSAGE_START,
  READ_MESSAGE_SUCCESS,
  READ_MESSAGE_ERROR,
} from '../../constants';

const countQuery = gql`
	query getUnreadCount{
	  getUnreadCount {
	    hostCount
	    guestCount
	    total
	  }
	}
`;

const UnreadThreadsQuery = gql`
	query getUnreadThreads{
	  getUnreadThreads {
	    id
	    threadItemUnread {
	      id
	      threadId
	      content
	      sentBy
	      isRead
	      type
	      createdAt
	      startDate
	      endDate
	      personCapacity
	    }
	  }
	}
`;

const InboxQuery = gql`
  query GetAllThreads($threadType: String, $threadId: Int){
    GetAllThreads(threadType: $threadType, threadId: $threadId) {
      threadsData {
        id
        listId
        guest
        listData {
          city
          state
          country
        }
        threadItem {
          id
          threadId
          content
          sentBy
          isRead
          type
          startDate
          endDate
          createdAt
        }
        guestProfile {
          profileId
          displayName
          picture
        }
        hostProfile {
          profileId
          displayName
          picture
        }
        status
      }
      count
    }
  }
`;


export function readMessage(threadId, threadType) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: READ_MESSAGE_START,
    });

    try {

      let mutation = gql`
          mutation readMessage($threadId: Int!){
              readMessage(threadId: $threadId) {
                status
			      }
		    	}
      `;

      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          threadId
        },
        refetchQueries: [
          {
            query: countQuery
          },
          {
            query: UnreadThreadsQuery
          },
          {
            query: InboxQuery,
            variables: {
              threadId,
              threadType
            }
          }
        ]
      });

      if (data && data.sendMessage) {
        dispatch({
          type: READ_MESSAGE_SUCCESS,
        });
      }

    } catch (error) {
      dispatch({
        type: READ_MESSAGE_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}

