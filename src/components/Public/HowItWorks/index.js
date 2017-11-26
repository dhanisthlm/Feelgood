import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './styles.css';

export class HowItWorks extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        const { t } = this.props;

        return (
            <div className="how-it-works">
                <div className="row-1">
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.6 489.6">
                                <path fill="#fff" d="M450.1 21.25H39.5C17.7 21.25 0 38.95 0 60.75v277.4c0 21.9 17.7 39.6 39.5 39.6h161v44.1h-31.4c-5.2 0-9.5 4.3-9.5 9.5v27.5c0 5.2 4.3 9.5 9.5 9.5h151.4c5.2 0 9.5-4.3 9.5-9.5v-27.5c0-5.2-4.3-9.5-9.5-9.5h-31.4v-44.1h161c21.8 0 39.5-17.7 39.5-39.5V60.75c0-21.8-17.7-39.5-39.5-39.5zm-14.4 302.1h-91.8l-2.6-14.3c-1.8-10-8.3-18.5-17.4-23l-34.8-17.3c-2-1-4-2.1-5.9-3.2l11 32.5-15.4-1.2-34 41.8-34-41.8-15.4 1.2 11.2-32.5-7 3.6-34.1 16.8c-9.1 4.5-15.6 13-17.4 23l-2.6 14.3H53.9V75.15h381.8v248.2z"/>
                                <path fill="#fff" d="M301.1 186.95c3.9-39.7-4.9-74.6-36.8-71.6 0 0-13.8-16.7-41.4-6.2-9.5 3.6-34.8 12.7-33.5 67.7s-19.6 55.4-19.6 55.4 10.7 15.6 47.2 15.3v10.3l27.7 81 27.7-80.8v-10.9s31.6 1 46.6-14.3c0 0-21.8-6.2-17.9-45.9z"/>
                            </svg>
                        </div>
                        <p className="heading">1. This is a heading to describe</p>
                        <p className="description">
                            <p className="description">
                                Lorem ipsum dolor sit amet, conseces adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas voluptate volup.
                                Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas volupat.
                                Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihillet quia quibusdam voluptas voluptate.
                            </p>
                        </p>
                    </div>
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 503.604 503.604" width="512" height="512">
                                <path fill="#ffffff" d="M337.324 0H167.192c-28.924 0-53.5 23.584-53.5 52.5v398.664c0 28.916 24.056 52.44 52.98 52.44l170.412-.184c28.92 0 52.58-23.528 52.58-52.448l.248-398.5C389.908 23.452 366.364 0 337.324 0zM227.68 31.476h49.36c4.336 0 7.868 3.52 7.868 7.868 0 4.348-3.532 7.868-7.868 7.868h-49.36c-4.348 0-7.868-3.52-7.868-7.868 0-4.348 3.52-7.868 7.868-7.868zm-29.66 2.504c2.916-2.912 8.224-2.952 11.136 0 1.46 1.456 2.324 3.5 2.324 5.588 0 2.048-.864 4.088-2.324 5.548-1.452 1.46-3.504 2.32-5.548 2.32-2.084 0-4.088-.86-5.588-2.32-1.452-1.456-2.28-3.5-2.28-5.548-.004-2.088.828-4.132 2.28-5.588zm52.752 454.028c-12.984 0-23.544-10.568-23.544-23.548 0-12.984 10.56-23.548 23.544-23.548s23.544 10.564 23.544 23.548c0 12.98-10.564 23.548-23.544 23.548zm114.716-63.1H141.232V74.756h224.256v350.152z" />
                            </svg>
                        </div>
                        <p className="heading">2. This is a heading to describe</p>
                        <p className="description">
                            <p className="description">
                                Lorem ipsum dolor sit amet, conseces adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas voluptate volup.
                                Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas volupat.
                                Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihillet quia quibusdam voluptas voluptate.
                            </p>
                        </p>
                    </div>
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg className="bank" xmlns="http://www.w3.org/2000/svg" width="841.889" height="595.281" viewBox="0 0 841.889 595.281">
                                <path fill="#FFF" d="M708.97 171.602l-280.2-140.68c-4.925-2.473-10.727-2.473-15.65 0L132.92 171.6c-5.894 2.96-9.614 8.99-9.614 15.587v58.132c0 9.63 7.81 17.44 17.44 17.44h560.4c9.63 0 17.438-7.81 17.438-17.44V187.19c0-6.598-3.72-12.63-9.614-15.588zm-288.025 9.773c-12.843 0-23.253-10.41-23.253-23.253s10.41-23.254 23.253-23.254 23.253 10.41 23.253 23.254c0 12.842-10.41 23.253-23.253 23.253zM701.145 438.322H659.29V297.64H531.397v140.682H310.492V297.64H182.6v140.682h-41.855c-9.63 0-17.44 7.81-17.44 17.44v93.012c0 9.632 7.81 17.44 17.44 17.44h560.4c9.632 0 17.44-7.81 17.44-17.44V455.76c0-9.63-7.808-17.438-17.44-17.438z"/>
                            </svg>
                        </div>
                        <p className="heading">3. This is a heading to describe</p>
                        <p className="description">
                            Lorem ipsum dolor sit amet, conseces adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas voluptate volup.
                            Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas volupat.
                            Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihillet quia quibusdam voluptas voluptate.
                        </p>
                    </div>
                </div>
                <div className="row-2">
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                                <g fill="#FFF">
                                    <path d="M245.323 53.325c-5.91 0-10.668 4.78-10.668 10.668 0 5.888 4.78 10.667 10.668 10.667 5.888 0 10.667-4.78 10.667-10.667 0-5.89-4.78-10.668-10.667-10.668z"/>
                                    <path d="M442.75 401.97l-58.776-14.68-4.353-17.43c8.087-8.255 14.786-18.005 19.95-28.5h22.996c-2.603 6.655-5.227 12.48-8.148 17.536-1.686 2.9-1.877 6.42-.576 9.493 1.323 3.092 3.99 5.375 7.232 6.187l26.86 6.7c7.23 1.81 14.592 4.65 23.147 8.96 1.494.746 3.137 1.13 4.8 1.13 1.174 0 2.37-.19 3.5-.597 2.73-.938 4.95-2.944 6.188-5.547 3.393-7.254 5.12-14.85 5.12-22.55V63.993c0-29.4-23.937-53.337-53.335-53.337H53.338C23.938 10.656 0 34.594 0 63.992v298.68c0 29.397 23.937 53.335 53.335 53.335h77.358c2.9 0 5.675-1.195 7.68-3.265 14.934-15.553 33.495-26.412 53.678-31.49l28.31-7.082c3.244-.812 5.91-3.093 7.233-6.165 1.323-3.072 1.11-6.593-.555-9.473-2.837-4.95-5.42-10.73-7.937-17.195h23.085c4.864 9.92 11.115 19.157 18.54 27.072l-4.716 18.86-58.776 14.677c-40.812 10.197-69.25 46.68-69.25 88.73 0 5.887 4.78 10.666 10.667 10.666h362.683c5.89 0 10.667-4.82 10.667-10.71 0-42.006-28.46-78.488-69.25-88.664zM291.32 101.56c-20.055 1.28-36.247 5.25-49.367 11.03-.812-5.376-2.604-10.837-6.252-16.405-6.442-9.813-19.69-21.526-46.443-21.526-8.02 0-26.263 0-43.778 11.18-50.776 1.556-57.39 27.2-57.39 49.558 0 4.417.875 13.1 1.62 19.884-2.176 1.195-4.14 2.773-5.803 4.673-4.117 4.693-6.037 10.923-5.27 17.132l2.773 22.252c1.003 7.935 6.208 14.442 13.91 17.387 2.75 14.357 9.643 28.29 19.393 39.17l-2.453 9.855-39.66 9.92c-26.67 6.657-46.168 28.525-50.35 55h-.94V63.992c0-17.644 14.358-32.002 32.002-32.002h384.016c17.644 0 32.002 14.358 32.002 32.002V330.67h-31.446c11.136-9.216 18.86-22.485 20.78-37.74l3.946-31.554c2.027-16.235-2.86-32.6-13.44-45.037 20.588-25.005 21.12-57.56 1.152-88.047-12.822-19.585-38.657-42.967-88.836-42.967-11.776 0-40.77 0-70.167 16.235z"/>
                                </g>
                            </svg>
                        </div>
                        <p className="heading">4. This is a heading to describe</p>
                        <p className="description">
                            <p className="description">
                                Lorem ipsum dolor sit amet, conseces adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas voluptate volup.
                                Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas volupat.
                                Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihillet quia quibusdam voluptas voluptate.
                            </p>
                        </p>
                    </div>
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                                <g fill="#FFF">
                                    <path d="M256 0C114.416 0 0 114.417 0 256c0 141.584 114.416 256 256 256 141.583 0 256-114.416 256-256C512 114.417 397.583 0 256 0zm0 469.472c-117.655 0-213.473-95.816-213.473-213.473 0-117.656 95.817-213.474 213.473-213.474S469.473 138.344 469.473 256c0 117.656-95.817 213.472-213.473 213.472z"/>
                                    <path d="M329.038 301.766c-40.333 40.333-104.595 40.333-144.928 0-8.672-8.673-21.838-8.673-30.51 0s-8.674 21.84 0 30.512c28.315 28.316 65.41 42.527 102.4 42.527s74.082-14.21 103.443-42.527c8.673-8.673 8.673-21.84 0-30.512-8.67-8.777-21.732-8.777-30.405 0z"/>
                                    <circle cx="162.273" cy="198.217" r="21.943"/>
                                    <circle cx="349.728" cy="198.217" r="21.943"/>
                                </g>
                            </svg>
                        </div>
                        <p className="heading">5. This is a heading to describe</p>
                        <p className="description">
                            <p className="description">
                                Lorem ipsum dolor sit amet, conseces adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas voluptate volup.
                                Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas volupat.
                                Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihillet quia quibusdam voluptas voluptate.
                            </p>
                        </p>
                    </div>
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.6 489.6">
                                <path fill="#fff" d="M450.1 21.25H39.5C17.7 21.25 0 38.95 0 60.75v277.4c0 21.9 17.7 39.6 39.5 39.6h161v44.1h-31.4c-5.2 0-9.5 4.3-9.5 9.5v27.5c0 5.2 4.3 9.5 9.5 9.5h151.4c5.2 0 9.5-4.3 9.5-9.5v-27.5c0-5.2-4.3-9.5-9.5-9.5h-31.4v-44.1h161c21.8 0 39.5-17.7 39.5-39.5V60.75c0-21.8-17.7-39.5-39.5-39.5zm-14.4 302.1h-91.8l-2.6-14.3c-1.8-10-8.3-18.5-17.4-23l-34.8-17.3c-2-1-4-2.1-5.9-3.2l11 32.5-15.4-1.2-34 41.8-34-41.8-15.4 1.2 11.2-32.5-7 3.6-34.1 16.8c-9.1 4.5-15.6 13-17.4 23l-2.6 14.3H53.9V75.15h381.8v248.2z"/>
                                <path fill="#fff" d="M301.1 186.95c3.9-39.7-4.9-74.6-36.8-71.6 0 0-13.8-16.7-41.4-6.2-9.5 3.6-34.8 12.7-33.5 67.7s-19.6 55.4-19.6 55.4 10.7 15.6 47.2 15.3v10.3l27.7 81 27.7-80.8v-10.9s31.6 1 46.6-14.3c0 0-21.8-6.2-17.9-45.9z"/>
                            </svg>s
                        </div>
                        <p className="heading">6. This is a heading to describe</p>
                        <p className="description">
                            Lorem ipsum dolor sit amet, conseces adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas voluptate volup.
                            Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihil quia quibusdam voluptas volupat.
                            Lorem ipsum dolor sit amet, con adipis elit. Earum ex, hic illo iste itaque nihillet quia quibusdam voluptas voluptate.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

HowItWorks.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('quoteView')(HowItWorks))

