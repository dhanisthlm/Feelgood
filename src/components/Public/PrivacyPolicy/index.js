import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Header from '../Header/index';
import styles from './styles.css';

export class PrivacyPolicy extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        const { t } = this.props;

        return (
            <div className="page privacy-policy">
                <Header location={this.props.location} />
                <div className="page-header"><h1>Baunad privacy policy</h1></div>
                <div className="privacy-wrapper">
                    <p className="preamble">Your privacy is very important to us. We designed our Privacy Policy to make important disclosures
                        about how you can use Zdravlje.nu and how we collect and use your content and information. We
                        encourage you to read the Privacy Policy in its entirety.</p>

                    <h3>Disclosure of information</h3>
                    <p>Any and all information collected through our Internet sites and counselling sessions will be strictly
                        confidential and will not be sold, rented, or otherwise disclosed to any third party not actively
                        engaged in providing services to our customers.
                        We shall always protect your personal information. However, Baunad doo Tuzla shall be compelled
                        to disclose the personal information of a user if he/she poses a danger to himself/herself/others, is
                        suspected of/reported for child abuse or if disclosure of his/her records are needed for any legal
                        procedure being taken against him/her.
                        Baunad doo Tuzla is not responsible if you disclose personal information during consultation or on
                        public thread forums or by being careless in protecting your password of your sign in.</p>

                    <h3>Security of information</h3>
                    <p>It is our policy to protect your personal information from unauthorized access or from being misused.
                        For that we take care to protect your information through security measures available through
                        technologically.
                        We never record online video sessions in order to protect your privacy.
                        The employees at Baunad doo Tuzla are trained and conversant with security policies and measures.
                        They realize that any breach of information security on their part will lead to severe disciplinary
                        action and even termination of their employment at Baunad doo Tuzla.</p>

                    <h3>Payment information</h3>
                    <p>Credit card number and/or other financial information is collected for the billing and payment
                        processes, including but not limited to the use and disclosure of such credit card number and
                        information to third parties as necessary to complete such billing operation. The credit card or debit
                        card details are transacted upon secure sites of approved payment gateways which are digitally
                        under encryption, thereby providing the highest possible degree of care as per current technology.
                        Baunad doo Tuzla does not save your credit card or debit card details.</p>

                    <h3>Deleting and editing of information</h3>
                    <p>We never record video sessions to protect your identity.
                        We will delete all your personal information from our systems if we receive a written request from
                        you to us to do so. We will immediately proceed to delete all your personal information from our
                        systems unless we are bound legally to do so. However, please keep in mind that we need to retain
                        some information for maintaining records. Some residual information will always remain in our
                        records even though we try to delete them.</p>

                    <h3>Browser and usage information</h3>
                    <p>We collect browser information like IP address, browser type, your geographic location, time spent
                        on different pages, information on page browsing, hardware information in case you are using a
                        mobile device to log into our website, information on the operating system for the purpose of
                        analyzing the profile of visitors to our website, their behavior online especially in their choice of
                        content and services. Analyzing this data would enable us to understand our visitors better and
                        improve our content and services. Information that we have about user behavior also helps us troubleshoot technical problems and
                        solve billing or payment errors. No personal identifying information will be tied to the results of anonymous and aggregated data.
                        We are not bound by the Privacy Policies of the third party websites.</p>

                    <h3>Consent to this privacy policy</h3>
                    <p>By using the services or by otherwise giving us your information, you will be deemed to have read,
                        understood and agreed to the practices and policies outlined in this privacy policy and agree to be
                        bound by the privacy policy. You hereby consent to our collection, use and sharing, disclosure of your
                        information as described in this privacy policy. We reserve the right to change, modify, add or delete
                        portions of the terms of this privacy policy, at our sole discretion, at any time. If you do not agree
                        with this privacy policy at any time, do not use any of the services or give us any of your information.
                        If you use the services on behalf of someone else, such as your child, or an entity, such as your
                        employer, you represent that you are authorized by such individual or entity to do (i) accept this
                        privacy policy on such individual’s or entity’s behalf, and (ii) consent on behalf of such individual or
                        entity to our collection, use and disclosure of such individual’s or entity’s information as described in
                        this privacy policy.</p>

                    <h3>Contact us</h3>
                    <p>For queries or for communicating to us about any privacy issue, please contact us at:</p>
                    <p className="contact">Email:</p>
                    <p className="contact">Phone:</p>
                    <h4>Our office address is:</h4>
                    <p className="address">Baunad doo Tuzla</p>
                    <p className="address">Zdravlje.nu</p>
                    <p className="address">Marsala Tita 109</p>
                    <p className="address">75000 Tuzla</p>
                    <p>Bosnia and Herzegovina</p>
                    <p>This Privacy notice was last updated on December 11 th 2017 and is deemed effective as of this date.</p>
                </div>
            </div>
        );
    }
}

PrivacyPolicy.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('privacyView')(PrivacyPolicy))

