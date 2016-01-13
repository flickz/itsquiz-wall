import React, {Component, PropTypes} from 'react';

import MainLayout from '../../components/layouts/MainLayout.jsx';

import {footerLinks} from '../../config';

export default class MainLayoutContainer extends Component {
    state = {
        isWelcomeScreenShown: false
    };

    componentDidMount() {
        const skipWelcomeScreen = localStorage.getItem('skipWelcomeScreen');
        const { skipWelcomeDialog, ref } = this.props.location.query;

        if (!skipWelcomeScreen && !skipWelcomeDialog) {
            this.setState({ isWelcomeScreenShown: true });
        }

        console.log(ref, localStorage.getItem('ref'));

        if (ref && !localStorage.getItem('ref')) {
            localStorage.setItem('ref', ref);
        }
    }

    handleWelcomeScreenDismiss = (needToSkip) => {
        this.setState({ isWelcomeScreenShown: false });

        if (needToSkip) {
            localStorage.setItem('skipWelcomeScreen', 'true');
        }
    };

    render() {
        const { isWelcomeScreenShown } = this.state;
        const isEmbedded = this.props.location.query.embed;

        return (
            <MainLayout
                showWelcomeScreen={!isEmbedded && isWelcomeScreenShown}
                onWelcomeScreenDismiss={this.handleWelcomeScreenDismiss}
                showFooter={!isEmbedded}>
                {this.props.children}
            </MainLayout>
        );
    }
}
