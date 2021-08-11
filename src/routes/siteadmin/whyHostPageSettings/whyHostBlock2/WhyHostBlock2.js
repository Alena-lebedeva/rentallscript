import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Loader from '../../../../components/Loader/Loader'
import s from './WhyHostBlock2.css';
import WhyHostFormBlock2 from '../../../../components/siteadmin/WhyHostPageSettings/WhyHostFormBlock2/WhyHostFormBlock2'
import getWhyHostPageSettings from './getWhyHostPageSettings.graphql';

class WhyHostBlock2 extends React.Component {

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
            return <WhyHostFormBlock2 initialValues={settingsCollection} title={title} />
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
)(WhyHostBlock2);