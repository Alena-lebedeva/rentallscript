import WhyHostBlockType from '../../types/WhyHostBlockType';
import { WhyHostInfoBlock } from '../../models'

import {
    GraphQLString as StringType
} from 'graphql';

const updateWhyHostPage = {

    type: WhyHostBlockType,

    args: {
        hostBannerTitle1: { type: StringType },
        hostBannerImage1: { type: StringType },
        whyBlockTitle1: { type: StringType },
        whyBlockContent1: { type: StringType },
        whyBlockTitle2: { type: StringType },
        whyBlockContent2: { type: StringType },
        hostingBlockTitleHeading: { type: StringType },
        hostingBlockTitle1: { type: StringType },
        hostingBlockTitle2: { type: StringType },
        hostingBlockTitle3: { type: StringType },
        hostingBlockContent1: { type: StringType },
        hostingBlockContent2: { type: StringType },
        hostingBlockContent3: { type: StringType },
        coverSectionTitle1: { type: StringType },
        coverSectionContent1: { type: StringType },
        coverSectionContent2: { type: StringType },
        coverSectionImage1: { type: StringType },
        coverSectionFeature1: { type: StringType },
        coverSectionFeature2: { type: StringType },
        coverSectionFeature3: { type: StringType },
        coverSectionFeature4: { type: StringType },
        coverSectionFeature5: { type: StringType },
        coverSectionFeature6: { type: StringType },
        paymentTitleHeading: { type: StringType },
        paymentTitle1: { type: StringType },
        paymentTitle2: { type: StringType },
        paymentTitle3: { type: StringType },
        paymentContent1: { type: StringType },
        paymentContent2: { type: StringType },
        paymentContent3: { type: StringType },
        quoteSectionTitle1: { type: StringType },
        quoteSectionContent1: { type: StringType },
        quoteSectionTitle2: { type: StringType },
        quoteSectionContent2: { type: StringType },
        quoteSectionImage1: { type: StringType },
        quoteSectionImage2: { type: StringType },
        quoteSectionButton1: { type: StringType },
        quoteSectionButton2: { type: StringType },
        faqTitle1: { type: StringType },
        faqTitle2: { type: StringType },
        faqTitle3: { type: StringType },
        faqTitle4: { type: StringType },
        faqTitle5: { type: StringType },
        faqTitle6: { type: StringType },
        faqTitle7: { type: StringType },
        faqTitle8: { type: StringType },
        faqContent1: { type: StringType },
        faqContent2: { type: StringType },
        faqContent3: { type: StringType },
        faqContent4: { type: StringType },
        faqContent5: { type: StringType },
        faqContent6: { type: StringType },
        faqContent7: { type: StringType },
        faqContent8: { type: StringType }
    },

    async resolve({ request }, {
        hostBannerTitle1,
        hostBannerImage1,
        whyBlockTitle1,
        whyBlockContent1,
        whyBlockTitle2,
        whyBlockContent2,
        hostingBlockTitleHeading,
        hostingBlockTitle1,
        hostingBlockTitle2,
        hostingBlockTitle3,
        hostingBlockContent1,
        hostingBlockContent2,
        hostingBlockContent3,
        coverSectionTitle1,
        coverSectionContent1,
        coverSectionContent2,
        coverSectionImage1,
        coverSectionFeature1,
        coverSectionFeature2,
        coverSectionFeature3,
        coverSectionFeature4,
        coverSectionFeature5,
        coverSectionFeature6,
        paymentTitleHeading,
        paymentTitle1,
        paymentTitle2,
        paymentTitle3,
        paymentContent1,
        paymentContent2,
        paymentContent3,
        quoteSectionTitle1,
        quoteSectionContent1,
        quoteSectionTitle2,
        quoteSectionContent2,
        quoteSectionImage1,
        quoteSectionImage2,
        quoteSectionButton1,
        quoteSectionButton2,
        faqTitle1,
        faqTitle2,
        faqTitle3,
        faqTitle4,
        faqTitle5,
        faqTitle6,
        faqTitle7,
        faqTitle8,
        faqContent1,
        faqContent2,
        faqContent3,
        faqContent4,
        faqContent5,
        faqContent6,
        faqContent7,
        faqContent8
    }) {

        if (request.user && request.user.admin == true) {
            let isWhyHostBlockUpdated = false;
            
            if (hostBannerTitle1) {
                const updatehostBannerTitle1 = await WhyHostInfoBlock.update({ value: hostBannerTitle1 }, { where: { name: 'hostBannerTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }


            if (hostBannerImage1) {
                const updatehostBannerImage1 = await WhyHostInfoBlock.update({ value: hostBannerImage1 }, { where: { name: 'hostBannerImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            
            if (whyBlockTitle1) {
                const updatewhyBlockTitle1 = await WhyHostInfoBlock.update({ value: whyBlockTitle1 }, { where: { name: 'whyBlockTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (whyBlockContent1) {
                const updatewhyBlockContent1 = await WhyHostInfoBlock.update({ value: whyBlockContent1 }, { where: { name: 'whyBlockContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (whyBlockTitle2) {
                const updatewhyBlockTitle2 = await WhyHostInfoBlock.update({ value: whyBlockTitle2 }, { where: { name: 'whyBlockTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (whyBlockContent2) {
                const updatewhyBlockContent2 = await WhyHostInfoBlock.update({ value: whyBlockContent2 }, { where: { name: 'whyBlockContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }


            if (hostingBlockTitleHeading) {
                const updatehostingBlockTitleHeading = await WhyHostInfoBlock.update({ value: hostingBlockTitleHeading }, { where: { name: 'hostingBlockTitleHeading' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (hostingBlockTitle1) {
                const updatehostingBlockTitle1 = await WhyHostInfoBlock.update({ value: hostingBlockTitle1 }, { where: { name: 'hostingBlockTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (hostingBlockTitle2) {
                const updatehostingBlockTitle2 = await WhyHostInfoBlock.update({ value: hostingBlockTitle2 }, { where: { name: 'hostingBlockTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (hostingBlockTitle3) {
                const updatehostingBlockTitle3 = await WhyHostInfoBlock.update({ value: hostingBlockTitle3 }, { where: { name: 'hostingBlockTitle3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (hostingBlockContent1) {
                const updatehostingBlockContent1 = await WhyHostInfoBlock.update({ value: hostingBlockContent1 }, { where: { name: 'hostingBlockContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (hostingBlockContent2) {
                const updatehostingBlockContent2 = await WhyHostInfoBlock.update({ value: hostingBlockContent2 }, { where: { name: 'hostingBlockContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (hostingBlockContent3) {
                const updatehostingBlockContent3 = await WhyHostInfoBlock.update({ value: hostingBlockContent3 }, { where: { name: 'hostingBlockContent3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (paymentTitleHeading) {
                const updatepaymentTitleHeading = await WhyHostInfoBlock.update({ value: paymentTitleHeading }, { where: { name: 'paymentTitleHeading' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (paymentTitle1) {
                const updatepaymentTitle1 = await WhyHostInfoBlock.update({ value: paymentTitle1 }, { where: { name: 'paymentTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (paymentTitle2) {
                const updatepaymentTitle2 = await WhyHostInfoBlock.update({ value: paymentTitle2 }, { where: { name: 'paymentTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (paymentTitle3) {
                const updatepaymentTitle3 = await WhyHostInfoBlock.update({ value: paymentTitle3 }, { where: { name: 'paymentTitle3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (paymentContent1) {
                const updatepaymentContent1 = await WhyHostInfoBlock.update({ value: paymentContent1 }, { where: { name: 'paymentContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (paymentContent2) {
                const updatepaymentContent2 = await WhyHostInfoBlock.update({ value: paymentContent2 }, { where: { name: 'paymentContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (paymentContent3) {
                const updatepaymentContent3 = await WhyHostInfoBlock.update({ value: paymentContent3 }, { where: { name: 'paymentContent3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionTitle1) {
                const updatecoverSectionTitle1 = await WhyHostInfoBlock.update({ value: coverSectionTitle1 }, { where: { name: 'coverSectionTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionImage1) {
                const updatecoverSectionImage1 = await WhyHostInfoBlock.update({ value: coverSectionImage1 }, { where: { name: 'coverSectionImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionContent1) {
                const updatecoverSectionContent1 = await WhyHostInfoBlock.update({ value: coverSectionContent1 }, { where: { name: 'coverSectionContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionContent2) {
                const updatecoverSectionContent2 = await WhyHostInfoBlock.update({ value: coverSectionContent2 }, { where: { name: 'coverSectionContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionFeature1) {
                const updatecoverSectionFeature1 = await WhyHostInfoBlock.update({ value: coverSectionFeature1 }, { where: { name: 'coverSectionFeature1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionFeature2) {
                const updatecoverSectionFeature2 = await WhyHostInfoBlock.update({ value: coverSectionFeature2 }, { where: { name: 'coverSectionFeature2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionFeature3) {
                const updatecoverSectionFeature3 = await WhyHostInfoBlock.update({ value: coverSectionFeature3 }, { where: { name: 'coverSectionFeature3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionFeature4) {
                const updatecoverSectionFeature4 = await WhyHostInfoBlock.update({ value: coverSectionFeature4 }, { where: { name: 'coverSectionFeature4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionFeature5) {
                const updatecoverSectionFeature5 = await WhyHostInfoBlock.update({ value: coverSectionFeature5 }, { where: { name: 'coverSectionFeature5' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (coverSectionFeature6) {
                const updatecoverSectionFeature6 = await WhyHostInfoBlock.update({ value: coverSectionFeature6 }, { where: { name: 'coverSectionFeature6' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (quoteSectionTitle1) {
                const updatequoteSectionTitle1 = await WhyHostInfoBlock.update({ value: quoteSectionTitle1 }, { where: { name: 'quoteSectionTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (quoteSectionTitle2) {
                const updatequoteSectionTitle2 = await WhyHostInfoBlock.update({ value: quoteSectionTitle2 }, { where: { name: 'quoteSectionTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (quoteSectionContent1) {
                const updatequoteSectionContent1 = await WhyHostInfoBlock.update({ value: quoteSectionContent1 }, { where: { name: 'quoteSectionContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (quoteSectionContent2) {
                const updatequoteSectionContent2 = await WhyHostInfoBlock.update({ value: quoteSectionContent2 }, { where: { name: 'quoteSectionContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (quoteSectionImage1) {
                const updatequoteSectionImage1 = await WhyHostInfoBlock.update({ value: quoteSectionImage1 }, { where: { name: 'quoteSectionImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (quoteSectionImage2) {
                const updatequoteSectionImage2 = await WhyHostInfoBlock.update({ value: quoteSectionImage2 }, { where: { name: 'quoteSectionImage2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (quoteSectionButton1) {
                const updatequoteSectionButton1 = await WhyHostInfoBlock.update({ value: quoteSectionButton1 }, { where: { name: 'quoteSectionButton1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (quoteSectionButton2) {
                const updatequoteSectionButton2 = await WhyHostInfoBlock.update({ value: quoteSectionButton2 }, { where: { name: 'quoteSectionButton2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqTitle1 || faqTitle1 == '') {
                const updatefaqTitle1 = await WhyHostInfoBlock.update({ value: faqTitle1 }, { where: { name: 'faqTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqTitle2 || faqTitle2 == '') {
                const updatefaqTitle2 = await WhyHostInfoBlock.update({ value: faqTitle2 }, { where: { name: 'faqTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqTitle3 || faqTitle3 == '') {
                const updatefaqTitle3 = await WhyHostInfoBlock.update({ value: faqTitle3 }, { where: { name: 'faqTitle3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqTitle4 || faqTitle4 == '') {
                const updatefaqTitle4 = await WhyHostInfoBlock.update({ value: faqTitle4 }, { where: { name: 'faqTitle4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqTitle5 || faqTitle5 == '') {
                const updatefaqTitle5 = await WhyHostInfoBlock.update({ value: faqTitle5 }, { where: { name: 'faqTitle5' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqTitle6 || faqTitle6 == '') {
                const updatefaqTitle6 = await WhyHostInfoBlock.update({ value: faqTitle6 }, { where: { name: 'faqTitle6' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqTitle7 || faqTitle7 == '') {
                const updatefaqTitle7 = await WhyHostInfoBlock.update({ value: faqTitle7 }, { where: { name: 'faqTitle7' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqTitle8 || faqTitle8 == '') {
                const updatefaqTitle8 = await WhyHostInfoBlock.update({ value: faqTitle8 }, { where: { name: 'faqTitle8' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqContent1 || faqContent1 == '') {
                const updatefaqContent1 = await WhyHostInfoBlock.update({ value: faqContent1 }, { where: { name: 'faqContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqContent2 || faqContent2 == '') {
                const updatefaqContent2 = await WhyHostInfoBlock.update({ value: faqContent2 }, { where: { name: 'faqContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqContent3 || faqContent3 == '') {
                const updatefaqContent3 = await WhyHostInfoBlock.update({ value: faqContent3 }, { where: { name: 'faqContent3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqContent4 || faqContent4 == '') {
                const updatefaqContent4 = await WhyHostInfoBlock.update({ value: faqContent4 }, { where: { name: 'faqContent4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqContent5 || faqContent5 == '') {
                const updatefaqContent5 = await WhyHostInfoBlock.update({ value: faqContent5 }, { where: { name: 'faqContent5' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqContent6 || faqContent6 == '') {
                const updatefaqContent6 = await WhyHostInfoBlock.update({ value: faqContent6 }, { where: { name: 'faqContent6' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqContent7 || faqContent7 == '') {
                const updatefaqContent7 = await WhyHostInfoBlock.update({ value: faqContent7 }, { where: { name: 'faqContent7' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (faqContent8 || faqContent8 == '') {
                const updatefaqContent8 = await WhyHostInfoBlock.update({ value: faqContent8 }, { where: { name: 'faqContent8' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }


            if (isWhyHostBlockUpdated) {
                return {
                    status: 'success'
                }
            } else {
                return {
                    status: 'failed'
                }
            }


        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default updateWhyHostPage;

/*

mutation (
    $hostBannerTitle1: String,
    $hostBannerImage1: String,
    $whyBlockTitle1: String,
    $whyBlockContent1: String,
    $whyBlockTitle2: String,
    $whyBlockContent2: String,
    $hostingBlockTitleHeading: String,
    $hostingBlockTitle1: String,
    $hostingBlockTitle2: String,
    $hostingBlockTitle3: String,
    $hostingBlockContent1: String,
    $hostingBlockContent2: String,
    $hostingBlockContent3: String,
    $coverSectionTitle1: String,
    $coverSectionContent1: String,
    $coverSectionContent2: String,
    $coverSectionImage1: String,
    $coverSectionFeature1: String,
    $coverSectionFeature2: String,
    $coverSectionFeature3: String,
    $coverSectionFeature4: String,
    $coverSectionFeature5: String,
    $coverSectionFeature6: String,
    $paymentTitleHeading: String,
    $paymentTitle1: String,
    $paymentTitle2: String,
    $paymentTitle3: String,
    $paymentContent1: String,
    $paymentContent2: String,
    $paymentContent3: String,
    $quoteSectionTitle1: String,
    $quoteSectionContent1: String,
    $quoteSectionTitle2: String,
    $quoteSectionContent2: String,
    $quoteSectionImage1: String,
    $quoteSectionImage2: String,
    $quoteSectionButton1: String,
    $quoteSectionButton2: String
) {
  updateWhyHostPage (
    hostBannerTitle1: $hostBannerTitle1,
    hostBannerImage1: $hostBannerImage1,
    whyBlockTitle1: $whyBlockTitle1,
    whyBlockContent1: $whyBlockContent1,
    whyBlockTitle2: $whyBlockTitle2,
    whyBlockContent2: $whyBlockContent2,
    hostingBlockTitleHeading: $hostingBlockTitleHeading,
    hostingBlockTitle1: $hostingBlockTitle1,
    hostingBlockTitle2: $hostingBlockTitle2,
    hostingBlockTitle3: $hostingBlockTitle3,
    hostingBlockContent1: $hostingBlockContent1,
    hostingBlockContent2: $hostingBlockContent2,
    hostingBlockContent3: $hostingBlockContent3,
    coverSectionTitle1: $coverSectionTitle1,
    coverSectionContent1: $coverSectionContent1,
    coverSectionContent2: $coverSectionContent2,
    coverSectionImage1: $coverSectionImage1,
    coverSectionFeature1: $coverSectionFeature1,
    coverSectionFeature2: $coverSectionFeature2,
    coverSectionFeature3: $coverSectionFeature3,
    coverSectionFeature4: $coverSectionFeature4,
    coverSectionFeature5: $coverSectionFeature5,
    coverSectionFeature6: $coverSectionFeature6,
    paymentTitleHeading: $paymentTitleHeading,
    paymentTitle1: $paymentTitle1,
    paymentTitle2: $paymentTitle2,
    paymentTitle3: $paymentTitle3,
    paymentContent1: $paymentContent1,
    paymentContent2: $paymentContent2,
    paymentContent3: $paymentContent3,
    quoteSectionTitle1: $quoteSectionTitle1,
    quoteSectionContent1: $quoteSectionContent1,
    quoteSectionTitle2: $quoteSectionTitle2,
    quoteSectionContent2: $quoteSectionContent2,
    quoteSectionImage1: $quoteSectionImage1,
    quoteSectionImage2: $quoteSectionImage2,
    quoteSectionButton1: $quoteSectionButton1,
    quoteSectionButton2: $quoteSectionButton2
  ) {
      status
  }
}

*/