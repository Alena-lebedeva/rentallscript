// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Apollo
import { graphql, gql, compose } from 'react-apollo';

// Redux form
import { reduxForm } from 'redux-form';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './WishListModalForm.css';
import {
  Col,
  Row
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';

//Images
import heartImage from './heart.png';
import heartIconFill from './heartFil.png'

// Redux Action
import { closeWishListModal } from '../../actions/WishList/modalActions';

// GraphQL Query
import getAllWishListGroupQuery from '../WishListModal/getAllWishListGroup.graphql';

class WishListModalForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      loading: {}
    };
  }

  async submitForm(values, dispatch) {
    const { closeWishListModal, mutate, profileId } = this.props;
    /*const { data } = await mutate({
      variables: values,
      refetchQueries: [{
        query: getAllWishListGroupQuery,
        variables: {
          profileId
        }
      }]
    });

    if (data.CreateWishLists.status == 'success') {
      dispatch(closeWishListModal);
    }*/

  }

  async handleClick(event, wishListGroupId) {
    const { mutate, listId, profileId } = this.props;
    const { loading } = this.state;

    /*let currentLoading = Object.assign({}, loading, { [wishListGroupId]: true });
      this.setState({
        loading: currentLoading
      });*/
    const { data } = await mutate({
      variables: {
        listId,
        wishListGroupId,
        eventKey: event
      },
      refetchQueries: [{
        query: getAllWishListGroupQuery,
        variables: {
          profileId
        }
      }]
    });

    /*currentLoading = Object.assign({}, loading, { [wishListGroupId]: false });
    this.setState({
      loading: currentLoading
    });*/
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, closeWishListModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { data, data: { getAllWishListGroup }, listId } = this.props;
    const { loading } = this.state;
    return (

      <form onSubmit={handleSubmit(this.submitForm)}>
        {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        {
          getAllWishListGroup && getAllWishListGroup.status == 'success' && getAllWishListGroup.count > 0 && <div>
            <ul className={s.listContainer}>
              {
                getAllWishListGroup.wishListGroupData.map((option, index) => {
                  return (
                    <li className={s.listContent} key={index}>
                      <div className={cx(s.labelSection, s.checkBoxLabel)}>
                        <label className={cx(s.checkboxLabel, s.noPadding)}>{option.name}</label>
                      </div>
                      <div className={cx(s.checkBoxSection)}>
                        {
                          /*loading[option.id] && <span className={s.loader}>
                            <Loader type="page" show={loading[option.id]} />
                          </span>*/
                        }
                        {
                          !loading[option.id] && (option.wishListIds.indexOf(listId) !== -1) && <span onClick={(event) => {
                            this.handleClick(false, option.id);
                          }}>
                            <img src={heartIconFill} className={s.wishListIcon} />
                          </span>
                        }
                        {
                          !loading[option.id] && (option.wishListIds.indexOf(listId) == -1) && <span onClick={(event) => {
                            this.handleClick(true, option.id);
                          }}>
                            <img src={heartImage} className={s.wishListIcon} />
                          </span>
                        }
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }
        {
          getAllWishListGroup && getAllWishListGroup.status == 'success' && getAllWishListGroup.count == 0 && <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <p className={cx(s.landingCaption, s.modalCaptionLinkLarge, s.spaceTop3)}>
                <FormattedMessage {...messages.noWishlists} />
              </p>
            </Col>
          </Row>
        }
      </form>
    );
  }

}

WishListModalForm = reduxForm({
  form: 'WishListModalForm',
  destroyOnUnmount: true
})(WishListModalForm);

const mapState = state => ({
  listId: state.modalStatus.listId,
  profileId: state.account.data.profileId,
});

const mapDispatch = {
  closeWishListModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation CreateWishList(
    $listId: Int!,
    $wishListGroupId:Int,
    $eventKey:Boolean,
){
    CreateWishList(
        listId: $listId,
        wishListGroupId: $wishListGroupId,
        eventKey: $eventKey,
    ) {
        status
    }
}
  `)
)(WishListModalForm);
