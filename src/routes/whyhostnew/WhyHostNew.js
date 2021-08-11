import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostNew.css';
import { graphql, gql, compose } from 'react-apollo';

// Components
import WhyHostBanner from './WhyHostBanner';
import WhyBlock from '../../components/WhyHost/WhyBlock';
import HostingBlock from '../../components/WhyHost/HostingBlock/HostingBlock';
import CoverSection from '../../components/WhyHost/CoverSection/CoverSection';
import ImageBanner from '../../components/WhyHost/ImageBanner/ImageBanner';
import PaymentContent from '../../components/WhyHost/PaymentContent/PaymentContent';
import QuoteSection from '../../components/WhyHost/QuoteSection/QuoteSection';
import CountingSection from '../../components/WhyHost/CountingSection/CountingSection';
import AboutSection from '../../components/WhyHost/AboutSection/AboutSection';
import FaqSection from '../../components/WhyHost/FaqSection/FaqSection';
import MoreSection from '../../components/WhyHost/MoreSection/MoreSection';
import OverlayImageBanner from '../../components/WhyHost/OverlayImageBanner/OverlayImageBanner';
import VideoSection from '../../components/WhyHost/VideoSection/VideoSection';
import getWhyHostPageSettings from './getWhyHostPageSettings.graphql';
import Loader from '../../components/Loader'


// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins
import { scroller } from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()


let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { data: { loading, getWhyHostPage }, title } = this.props
    let settingsCollection = {}

    if (loading) {

      return <Loader type={"text"} />;

    } else {

      getWhyHostPage.map((item, key) => {
        settingsCollection[item.name] = item.value
      });

      return (
        <div className="whyhost-content">
          <WhyHostBanner data={settingsCollection} />
          <Element name="test1" className="element">
            <WhyBlock data={settingsCollection} />

            <HostingBlock data={settingsCollection} />

            {/* <VideoSection /> */}

            <CoverSection data={settingsCollection} />

            <ImageBanner data={settingsCollection} />

            <PaymentContent data={settingsCollection} />

            <QuoteSection data={settingsCollection} />

            {/* <CountingSection />

          <AboutSection /> */}

            <FaqSection data={settingsCollection}/>

            {/* <MoreSection /> */}

            {/* <OverlayImageBanner /> */}
          </Element>


        </div>
      );
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
)(EditProfile);
