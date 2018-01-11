import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getInactivityConfig } from '../../actions/config';
import _ from 'lodash';

export class InactivityModal extends Component {

    constructor (props) {
        super(props);

        this.state = {
            showDialog: false,
            startTime: null,
            timeRemaining: '2:00',
            idleTime: 0,
            location: null,
            countInactivity: true,
            idleTtl: 3000,
            tick: 10000,
        };

        this.countDownToLogout = this.countDownToLogout.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.timeIncrement = this.timeIncrement.bind(this);
        this.listenForActivity = this.listenForActivity.bind(this);
        this.startCountInactivity = this.startCountInactivity.bind(this);
        this.stopCountInactivity = this.stopCountInactivity.bind(this);
        this.resetInactivity = this.resetInactivity.bind(this);
        this.debounce = this.debounce.bind(this);
    }

    componentDidMount () {
        browserHistory.listen(location => {
            if (this.state.location !== location.pathname) {
                this.setState({ idleTime: 0 });
            }

            this.setState({ location: location.pathname });

            this.startCountInactivity();
            this.listenForActivity();
        });
    }

    componentWillUnmount () {
        clearInterval(this.timerInterval);
        clearInterval(this.countdownToLogoutInterval);

        window.removeEventListener('mousemove', this.throttledDebounce);
        window.removeEventListener('keydown', this.throttledDebounce);

        this.throttledDebounce.cancel();
    }

    /**
    * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	countDownToLogout () {
        const MODAL_COUNTDOWN_START = 120000; //2 minutes
        const startTime = this.state.startTime;
        const timeDiff = Date.now() - startTime;
        const ns = (((MODAL_COUNTDOWN_START - timeDiff) / 1000) >> 0);
        const m = (ns / 60) >> 0;
        const s = ns - m * 60;

        if (ns > 0) {
            this.setState({ timeRemaining: m + ':' + (('' + s).length > 1 ? '' : '0') + s });
        }

        if (ns === 0) {
            this.logoutUser();
        }
	}

    debounce () {
        this.setState({ idleTime: 0 });
    }

    listenForActivity () {
        this.throttledDebounce = _.throttle(this.debounce, this.state.tick);
        window.addEventListener('mousemove', this.throttledDebounce);
        window.addEventListener('keydown', this.throttledDebounce);
    }

    startCountInactivity () {
        if (!this.timerInterval) {
            this.timerInterval = setInterval(this.timeIncrement.bind(this), this.state.tick);
        }
    }

    stopCountInactivity () {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            delete this.timerInterval;
        }
    }

    resetInactivity () {
        this.setState({ idleTime: 0, showDialog: false });
    }

    timeIncrement () {
        this.setState({ idleTime: parseInt(this.state.idleTime + parseInt(this.state.tick)) });
        if (this.state.idleTime > parseInt(this.state.idleTtl)) {
            this.stopCountInactivity();

            this.setState({
                startTime: Date.now(),
                showDialog: true
            }, () => {
                this.countdownToLogoutInterval = setInterval(this.countDownToLogout, 1000);
            });
        }
    }

    closeDialog () {
        clearInterval(this.countdownToLogoutInterval);
        this.setState({ showDialog: false, timeRemaining: '' });
        this.resetInactivity();
        this.startCountInactivity();
    }

    logoutUser () {
        window.removeEventListener('mousemove', this.throttledDebounce);
        window.removeEventListener('keydown', this.throttledDebounce);

        clearInterval(this.countdownToLogoutInterval);
        clearInterval(this.timerInterval);

        this.setState({ showDialog: false });
        this.setState({ countInactivity: false });
        this.stopCountInactivity();

        this.props.resetOrder();
    }

    render () {
        return (
            <div>
                {(() => {
                    if (this.state.showDialog === true) {
                        return (
                            <div className="activity-wrapper">
                                <div className="box">
                                    <p>Dugo ste bili neaktivni, ako ne kliknete na moju kupovinu, vaš započeti nalog će se završiti i u {this.state.timeRemaining} minuta ćete biti preusmereni na početnu stranicu.</p>
                                    <button onClick={this.closeDialog}>Nastaviti</button>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(InactivityModal);