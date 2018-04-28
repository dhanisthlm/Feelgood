import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './styles.css';

export class Share extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        const { t } = this.props;

        return (
            <div className="share">
                <div>
                    <img src="/images/facebook.svg" />
                    <span className="label">Facebook</span>
                </div>
                <div>
                    <img src="/images/twitter.svg" />
                    <span className="label">Twitter</span>
                </div>
                <div>
                    <img src="/images/youtube.svg" />
                    <span className="label">Youtube</span>
                </div>
                <div>
                    <img src="/images/instagram.svg" />
                    <span className="label">Instagram</span>
                </div>
                <div>
                    <img src="/images/skype.svg" />
                    <span className="label">Skype</span>
                </div>
            </div>
        );
    }
}

Share.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('ShareView')(Share))

