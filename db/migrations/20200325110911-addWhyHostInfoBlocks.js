'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('WhyHostInfoBlock', [
      {
        title: 'Host Banner Title 1',
        value: '',
        name: 'hostBannerTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Host Banner Image 1',
        value: '',
        name: 'hostBannerImage1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Why Block Title 1',
        value: '',
        name: 'whyBlockTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Why Block Title 2',
        value: '',
        name: 'whyBlockTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Why Block Content 1',
        value: '',
        name: 'whyBlockContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Why Block Content 2',
        value: '',
        name: 'whyBlockContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hosting Block Title Heading',
        value: '',
        name: 'hostingBlockTitleHeading',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hosting Block Title 1',
        value: '',
        name: 'hostingBlockTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hosting Block Title 2',
        value: '',
        name: 'hostingBlockTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hosting Block Title 3',
        value: '',
        name: 'hostingBlockTitle3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hosting Block Content 1',
        value: '',
        name: 'hostingBlockContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hosting Block Content 2',
        value: '',
        name: 'hostingBlockContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hosting Block Content 3',
        value: '',
        name: 'hostingBlockContent3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Title 1',
        value: '',
        name: 'coverSectionTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Image 1',
        value: '',
        name: 'coverSectionImage1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Content 1',
        value: '',
        name: 'coverSectionContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Content 2',
        value: '',
        name: 'coverSectionContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Feature 1',
        value: '',
        name: 'coverSectionFeature1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Feature 2',
        value: '',
        name: 'coverSectionFeature2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Feature 3',
        value: '',
        name: 'coverSectionFeature3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Feature 4',
        value: '',
        name: 'coverSectionFeature4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Feature 5',
        value: '',
        name: 'coverSectionFeature5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cover Section Feature 6',
        value: '',
        name: 'coverSectionFeature6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Payment Title Heading',
        value: '',
        name: 'paymentTitleHeading',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Payment Title 1',
        value: '',
        name: 'paymentTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Payment Title 2',
        value: '',
        name: 'paymentTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Payment Title 3',
        value: '',
        name: 'paymentTitle3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Payment Content 1',
        value: '',
        name: 'paymentContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Payment Content 2',
        value: '',
        name: 'paymentContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Payment Content 3',
        value: '',
        name: 'paymentContent3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quote Section Title 1',
        value: '',
        name: 'quoteSectionTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quote Section Title 2',
        value: '',
        name: 'quoteSectionTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quote Section Content 1',
        value: '',
        name: 'quoteSectionContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quote Section Content 2',
        value: '',
        name: 'quoteSectionContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quote Section Image 1',
        value: '',
        name: 'quoteSectionImage1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quote Section Image 2',
        value: '',
        name: 'quoteSectionImage2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quote Section Button 1',
        value: '',
        name: 'quoteSectionButton1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quote Section Button 2',
        value: '',
        name: 'quoteSectionButton2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Title 1',
        value: '',
        name: 'faqTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Title 2',
        value: '',
        name: 'faqTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Title 3',
        value: '',
        name: 'faqTitle3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Title 4',
        value: '',
        name: 'faqTitle4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Title 5',
        value: '',
        name: 'faqTitle5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Title 6',
        value: '',
        name: 'faqTitle6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Title 7',
        value: '',
        name: 'faqTitle7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Title 8',
        value: '',
        name: 'faqTitle8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Content 1',
        value: '',
        name: 'faqContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Content 2',
        value: '',
        name: 'faqContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Content 3',
        value: '',
        name: 'faqContent3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Content 4',
        value: '',
        name: 'faqContent4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Content 5',
        value: '',
        name: 'faqContent5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Content 6',
        value: '',
        name: 'faqContent6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Content 7',
        value: '',
        name: 'faqContent7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'FAQ Content 8',
        value: '',
        name: 'faqContent8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('WhyHostInfoBlock', {
        name: {
          $in: ['hostBannerTitle1', 'hostBannerImage1', 'whyBlockTitle1', 'whyBlockTitle2', 'whyBlockContent1', 'whyBlockContent2',
          'hostingBlockTitleHeading', 'hostingBlockTitle1', 'hostingBlockTitle2', 'hostingBlockTitle3', 'hostingBlockContent1', 'hostingBlockContent2', 'hostingBlockContent3',
          'coverSectionTitle1', 'coverSectionImage1', 'coverSectionContent1', 'coverSectionContent2', 'coverSectionContent3',
          'coverSectionFeature1', 'coverSectionFeature2', 'coverSectionFeature3', 'coverSectionFeature4', 'coverSectionFeature5', 'coverSectionFeature6',
          'paymentTitleHeading', 'paymentTitle1', 'paymentTitle2', 'paymentTitle3', 'paymentContent1', 'paymentContent2', 'paymentContent3',
          'quoteSectionTitle1', 'quoteSectionTitle2', 'quoteSectionContent1', 'quoteSectionContent2', 'quoteSectionImage1', 'quoteSectionImage2',
          'quoteSectionImage1', 'quoteSectionImage2', 'faqTitle1', 'faqTitle2', 'faqTitle3', 'faqTitle4', 'faqTitle5', 'faqTitle6', 'faqTitle7', 'faqTitle8',
          'faqContent1', 'faqContent2', 'faqContent3', 'faqContent4', 'faqContent5', 'faqContent6', 'faqContent7', 'faqContent8'
        ]
        }
      })
    ])
  }
};
