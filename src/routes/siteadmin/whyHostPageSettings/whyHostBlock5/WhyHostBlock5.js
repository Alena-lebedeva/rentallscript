import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Loader from '../../../../components/Loader/Loader'
import s from './WhyHostBlock5.css';
import WhyHostFormBlock5 from '../../../../components/siteadmin/WhyHostPageSettings/WhyHostFormBlock5/WhyHostFormBlock5'
import getWhyHostPageSettings from './getWhyHostPageSettings.graphql';

class WhyHostBlock5 extends React.Component {

    static defaultProps = {
        data: {
            loading: false
        }
    };

    render() {
        const { data: { loading, getWhyHostPage }, title } = this.props
        let settingsCollection = {}
        if(loading){
            return <Loader type={"text"} />;
        } else {
            getWhyHostPage.map((item, key) => {
                settingsCollection[item.name] = item.value
            });
            return <WhyHostFormBlock5 initialValues={settingsCollection} title={title} />
        }
    }
}

export default compose(
    withStyles(s),
    graphql(getWhyHostPageSettings, {
        options: {
            fetchPolicy: 'network-only',
            ssr: false
        }
    }),
)(WhyHostBlock5);