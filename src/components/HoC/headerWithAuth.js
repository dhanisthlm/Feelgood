import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ping, logout } from '../../actions/auth';

function headerWithLogin (component) {
    class headerLogin extends component {

        constructor (props) {
            super(props);

            this.state = {};
        }

        render() {
            return (
                    <component />
            )
        }
    }

    const mapStateToProps = (state) => ({
        encounters: state.encounter.list
    });

    return connect(mapStateToProps)(headerLogin);
}

export default headerWithLogin;