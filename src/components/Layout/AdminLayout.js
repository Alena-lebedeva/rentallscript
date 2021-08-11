import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminLayout.css';
import AdminHeader from '../Header/AdminHeader';
import AdminFooter from '../siteadmin/AdminFooter';
import SideBar from '../siteadmin/SideBar';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="adminstyle">
        <AdminHeader />
        <div className={s.adminLayout}>
          <SideBar />
          <div className={s.test}>
            {this.props.children}
          </div>
          <AdminFooter />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Layout);
