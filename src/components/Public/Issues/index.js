import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './styles.css';

export class Issues extends Component {
	constructor (props) {
		super(props);

		this.state = {
			issues: [
				'stress',
				'anxiety',
				'exhaustion',
				'backPain',
				'depression',
				'kids',
				'weight',
				'panic',
				'fobia',
				'violence',
				'stuck'
			]
		};

		this.renderMobileIssues = this.renderMobileIssues.bind(this);
		this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
        this.handleSwipeRight = this.handleSwipeRight.bind(this);
	}

	componentDidMount () {
		const body = document.getElementsByTagName('body')[0];
		const width = body.offsetWidth;
		const issues = document.querySelectorAll('.issue-wrapper');

		for (var issue of issues) {
			issue.style.width = width + 'px';
		}
	}

	handleMouseEnter (e) {
		e.currentTarget.classList.add('show');
	}

	handleMouseLeave (e) {
		e.currentTarget.classList.remove('show');
	}

	renderMobileIssues () {
		const { t } = this.props;

		return this.state.issues.map((issue, i) => {
			const name = `issues.${issue}.name`;
			const description = `issues.${issue}.description`;
			const issueClass = `issue ${issue}`;
			return (
				<div key={i} className="issue-wrapper">
					<div id={ t(name) }
						 onMouseEnter={this.handleMouseEnter}
						 onMouseLeave={this.handleMouseLeave}
						 ref={(issueRef) => { this.issueRef = issueRef; }}
						 className={ issueClass }>
					</div>
					<h6 className="heading">{ t(name) }</h6>
					<p className="issue-text">{ t(description) }</p>
					<div className="text-wrapper text-wrapper-mobile">
						<h3 className="heading">{ t('heading') }</h3>
						<p className="preamble">{ t('preamble') }</p>
						<a href="/kontakt" className="issue-button">{ t('contactUs') }</a>
					</div>
				</div>
			);
		})
	}

    handleSwipeRight () {
        const carousel = this.carousel;
        const issues = this.state.issues;
        const first = issues.pop();

        issues.unshift(first);
        this.setState({issues});

        carousel.classList.add('swipe-left');
        carousel.classList.add('swipe-zero');
    }

    handleSwipeLeft () {
		const carousel = this.refs.carousel;
        const issues = this.state.issues;
        const first = issues.shift();

        issues.push(first);
        this.setState({issues});

        carousel.classList.add('swipe-left');
        carousel.classList.add('swipe-zero');
	}

	render () {
		const { t } = this.props;

		return (
			<div>
				<div id="usluge" className="issues desktop-issues">
					<div className="row-1">
						<div id={ t('issues.stress.name') } onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="stres"
							 className="issue stres">
							<p className="issue-text">{ t('issues.stress.description')}</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
								<path fill="#C04C9C" d="M197.528 283.245c-25.568 29.446-24.312 75.135 2.725 103.322 15.09 15.823 35.313 23.683 55.434 23.683 19.7 0 39.296-7.545 54.28-22.53 6.812-6.81 12.156-14.67 15.823-22.948l99.025-191.974c2.62-5.45-3.038-11.107-8.487-8.488l-191.974 99.026c-9.955 4.4-19.072 11.107-26.826 19.91zm35 27.036c6.392-6.392 14.775-9.64 23.158-9.64s16.766 3.248 23.263 9.64c12.783 12.785 12.783 33.64 0 46.423-6.393 6.392-14.776 9.64-23.264 9.64-8.383 0-16.767-3.248-23.158-9.64-12.89-12.89-12.89-33.638 0-46.422zm228.753 47.47c0-36.256-9.534-71.885-27.663-103.007-7.02-12.156-2.934-27.665 9.222-34.686s27.663-2.935 34.684 9.222C500.054 268.155 512 312.586 512 357.75c0 14.043-11.317 25.36-25.36 25.36-13.937 0-25.36-11.317-25.36-25.36zM0 357.75c0-141.15 114.85-256 256-256 32.8 0 64.76 6.078 94.938 18.234 12.994 5.24 19.28 19.91 14.146 32.903-5.24 12.994-19.91 19.28-32.903 14.146-24.205-9.64-49.88-14.565-76.18-14.565-113.174 0-205.283 92.11-205.283 205.282 0 14.042-11.317 25.358-25.36 25.358C11.318 383.108 0 371.793 0 357.75z"/>
							</svg>
							<p>Stres</p>
						</div>
						<div id={ t('issues.anxiety.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="sikiracija"
							 className="issue sikiracija">
							<p className="issue-text">{ t('issues.anxiety.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="292" height="374" viewBox="285.445 114.14 292 374">
								<path fill="#C04C9C" d="M507 127.726c-14.6 5.5-21.6 12.6-28.9 29-1.3 2.9-1.2 23.8.1 25.4.6.7 1.4 2.4 1.8 3.8 2.6 8.4 13.8 19.6 23.9 23.9 3.2 1.4 4.6 2.6 4.3 3.5-.3.8-2.8 4.6-5.6 8.5s-5.1 7.3-5.1 7.6c0 .3-.5 1.1-1 1.8-.6.7-3 4-5.5 7.4-2.5 3.5-4.9 6.3-5.3 6.3-1.1 0-7.6-7-9.1-9.7-.6-1.2-1.7-2.7-2.3-3.5-3.4-3.5-8.8-10.8-8.8-11.7 0-.9 2.8-7.7 5.1-12.3 1.3-2.6 1.1-15.6-.3-19.7-2.1-6-8.3-14.5-12.2-16.6-1.926-1.432-3.386-2.2-3.696-2.453-.284-.232-3.833-1.958-5.48-2.562-2-1-6.212-2.937-12.812-2.937-8.2 0-9.912 1.753-14.412 4.053-2.9 1.4-6.8 4.5-8.9 7.1-8.2 10-14.8 17.8-15.3 18.3-.3.3-2.1 2.5-4 5s-3.7 4.7-4 5c-.3.3-2.7 3.2-5.2 6.5s-5.6 7.1-6.8 8.5c-1.2 1.4-3.4 4.1-4.8 6-1.5 1.9-3.6 4.4-4.7 5.5-1.1 1.1-3.3 3.8-4.9 6-1.7 2.2-5.3 6.7-8 10-2.8 3.4-6.4 7.8-8.1 10-3.9 4.9-9.9 12.2-13.3 16-1.5 1.6-3.5 4.2-4.4 5.7-1 1.5-2.9 4-4.3 5.5-2.5 2.8-13.9 16.8-20.3 25-1.8 2.3-4.5 6.8-6 10-2.3 5-2.7 7-2.7 15.3 0 8 .4 10.2 2.3 14 5 9.6 13.1 15.8 24.2 18.3 2.7.6 34.2 1.3 79.5 1.6l75 .6.8 4c.5 2.2 1.4 7.8 2.2 12.5.7 4.7 1.8 11 2.3 14s2.4 14 4.1 24.5c7.4 44.4 7.6 44.9 14 49 7.6 4.7 17.2 2.9 25.5-4.9 6.6-6.3 6.8-14 1.1-45.1-2.9-15.8-5.3-30.1-6.5-39-.4-3.3-1.3-8.9-2-12.5-.6-3.6-1.5-8.8-2-11.5-.5-2.8-1.4-7.7-2-11-.6-3.3-1.5-9.2-2-13-1.4-12-4.1-17.5-10.1-20.6-3.6-1.8-6.3-1.9-56.9-1.9h-53.1l.7-2.2c.3-1.2 1-2.6 1.5-3.2.5-.6 3.3-4 6.2-7.6 2.8-3.6 6.2-7.6 7.5-9 1.2-1.3 2.2-2.7 2.2-3 0-.4 1.5-2.3 3.3-4.2 1.7-2 3.9-4.4 4.7-5.4.8-1.1 4.4-5.5 7.9-9.9s7-8.4 7.8-8.8c1.6-1 2.5-.2 9 8.3 2.3 3 5 6.4 6 7.5 1 1.1 3.9 4.7 6.3 8 6.7 9 11 13.1 15.8 14.9 5.6 2.1 9 2 15.7-.5 5-1.8 12.5-7.9 12.5-10 0-.4.6-1.4 1.3-2.1 2.2-2.3 11.3-15.2 12-17.1.3-.9 1.1-1.7 1.7-1.7.5 0 1-.4 1-1 0-.5 2.3-4.2 5-8.2 2.8-4 8-11.8 11.8-17.3 3.7-5.5 7-10.2 7.4-10.3.5-.2.8-.8.8-1.3 0-.4 1.5-2.9 3.3-5.5 2.8-4 3.2-5.3 3.2-11.2.1-6.6.2-6.8 4.5-11.3 6.4-6.6 8-9.1 10.8-16.7 2.1-5.8 2.4-23.4.5-25.4-.7-.6-1.3-2.2-1.3-3.3 0-2.8-6.8-13.1-11.1-17-5.7-5.1-9.2-7.1-16.8-9.9-9.6-3.4-17.1-3.4-26.6.2z"/>
							</svg>
							<p>Sikiracija</p>
						</div>
						<div id={ t('issues.exhaustion.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="iscrpljenost"
							 className="issue iscrpljenost">
							<p className="issue-text">{ t('issues.exhaustion.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="448" height="340" viewBox="0 0 448 340">
								<g fill="#C04C9C">
									<path fill="#C04C9C" d="M15 13.4l-3 2.8V325.5l2.7 3 2.6 3H48c29.7 0 30.8-.1 33.1-2.1l2.4-2.1.5-33.6.5-33.7 142.3-.3 142.2-.2v32c0 27.8.2 32.5 1.6 35.3.9 1.8 2.2 3.5 2.8 3.9.6.4 14.9.8 31.8.8 32.3 0 30.7.2 34.6-4.4 1.6-1.9 1.8-132.6.2-132.6-.5 0-1-.7-1-1.5s-.9-1.9-1.9-2.5c-1.3-.7-58.4-1-177.5-1H84l-.2-87.4-.3-87.4-2.4-2.1c-2.3-2-3.4-2.1-32.8-2.1H18l-3 2.9z"/>
									<path fill="#C04C9C" d="M146 64.5c-1.4.4-5.3 1.6-8.7 2.6-3.5 1-6.3 2.1-6.3 2.6 0 .4-.7.8-1.5.8s-1.5.4-1.5 1c0 .5-.7 1-1.6 1-1.6 0-14.6 12.4-15.8 15-.3.8-1.4 2.8-2.4 4.5-2.3 3.6-4.6 10.8-6.2 19.2-1 5-1 7.6 0 12.5 1.4 7.1 4 16 4.9 16.8.3.3 1.5 2.3 2.5 4.5 2.1 4.3 15 17.5 17.1 17.5.8 0 1.5.4 1.7.8.2.4 3.4 2.1 7.3 3.8 6.6 2.7 7.8 2.9 20.7 2.9 9.6 0 14.1-.4 15-1.3.6-.6 1.9-1.2 2.8-1.2 2.5 0 15.1-7.9 18.9-11.9 5.2-5.4 11.5-15.9 13.4-22.2 2.3-7.6 2.3-24.3 0-31.8-1-3.1-2.8-7.3-4-9.3-1.3-2.1-2.3-4.1-2.3-4.5 0-.5-2.4-3.3-5.3-6.4-5.5-5.9-14.9-12.4-19.4-13.5-1.6-.4-3.2-1-3.8-1.4-2.8-2.1-21.2-3.5-25.5-2zM230.1 66.4l-3.1 2.9V165.6l2.5 2.4 2.4 2.5h101.8c56 0 102.3-.4 102.8-.8 3.4-2.4 4.6-6.4 4.2-13.5-.6-8.5-2.3-19.4-3.6-22.2-.5-1.1-2.1-5.2-3.7-9-5.6-14-12.2-23.6-23.4-34.3-3-2.9-6.7-6-8.2-7-1.6-.9-2.8-2-2.8-2.4 0-.4-.7-.8-1.5-.8s-1.5-.4-1.5-1c0-.5-1.1-1.2-2.5-1.6-1.4-.3-2.5-1-2.5-1.5s-.9-.9-2-.9-2-.5-2-1c0-.6-.6-1-1.2-1-.7 0-3.4-1.1-6-2.4-2.7-1.3-6.7-2.7-9-3.1-2.4-.4-4.7-1.1-5.3-1.5-2.4-1.9-13.5-2.3-71.1-2.7l-61.1-.3-3.2 2.9z"/>
								</g>
							</svg>
							<p>Iscrpljenost</p>
						</div>
						<div id={ t('issues.weight.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="tezina"
							 className="issue tezina">
							<p className="issue-text">{ t('issues.weight.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
								<g fill="#C04C9C">
									<path fill="#C04C9C" d="M416 0H96C42.97 0 0 42.97 0 96v320c0 53.032 42.97 96 96 96h320c53.03 0 96-42.968 96-96V96c0-53.03-42.97-96-96-96zm-61.54 236.307H157.54l-78.77-98.46s59.077-78.77 177.23-78.77c118.154 0 177.23 78.77 177.23 78.77l-78.767 98.46z"/>
									<path fill="#C04C9C" d="M307.456 216.615L334.414 98.66l-78.02 117.955"/>
								</g>
							</svg>
							<p>Tezina</p>
						</div>
					</div>
					<div className="row-2">
						<div id={ t('issues.backPain.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="bol"
							 className="issue bol">
							<p className="issue-text">{ t('issues.backPain.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="452" height="399" viewBox="0 0 452 399">
								<path fill="#C04C9C" d="M354.5 25.5c-3.3.6-6.9 1.4-8 1.9-1.1.4-4.5 1.7-7.5 2.8-8 3.1-14.9 7.8-22 14.8-4.1 4.2-10 11-10 11.7 0 .2-1.2 2.5-2.7 5-1.5 2.6-3.8 7.8-5.2 11.7-2.3 6.4-2.6 8.5-2.6 22.6 0 14.3.2 16.1 2.7 23.2 1.5 4.2 3.8 9.5 5.2 11.7 1.4 2.2 2.6 4.4 2.6 4.7 0 .4.7 1.4 1.5 2.3.8.9 3.1 3.6 5.1 6.1 2 2.4 6.1 6.4 9.2 8.7 3.2 2.4 6.2 4.7 6.8 5.2.6.5 2.1 1.2 3.4 1.6 1.3.4 3.7 1.6 5.4 2.6 1.7 1.1 4 1.9 5.2 1.9 1.1 0 2.4.4 3 .9 3.1 3.1 25.7 4.1 36.3 1.7 6.7-1.5 20.7-7 22.1-8.7.3-.3 1.6-1.2 2.9-1.9 6.6-3.4 17.5-15.2 22.5-24.2 3.3-5.9 7.2-16.9 8.1-22.8 1.4-9 .5-29.7-1.5-32.5-.3-.6-1.3-3-2-5.5-5.1-17-23.9-35.8-42-42-1.9-.7-4.4-1.6-5.5-2-5.8-2.4-23.5-3.2-33-1.5zM287 146.3c0 .7 2 3.4 4.4 6 3.4 3.6 4.8 6.3 6.2 11.3 1.7 6.3 1.7 6.9 0 13.2-1.7 6.5-4.8 11.6-9.6 15.9-1.4 1.2-3 2.3-3.5 2.3-.602 0-2.602.8-4.5 1.9-2.9 1.5-6.2 1.9-19.5 2.1-8.8.1-18.2.4-21 .5-2.7.2-12.102.3-20.7.4l-15.7.1-3.2 5c-1.8 2.7-3.6 5-4.1 5-.4 0-.8.4-.8.9 0 .6-1.3 2.9-2.9 5.3-3.1 4.6-7.6 12.7-14.1 25-4 7.7-4.9 12.2-3.102 15.6 5.9 11.1 6.7 20 2.6 28.2-2.7 5.3-8.1 12-9.7 12-.5 0-2.1.9-3.5 2s-3.7 2-5 2c-4.3 0-6 1.7-7.2 7.2-.7 2.9-1.6 6.9-2.2 8.8-.5 1.9-1.1 4.4-1.3 5.5-.1 1.1-.6 3.1-.898 4.5-2 8.2-4.2 29.8-4.2 42.3v12.9l36-.2c19.8-.1 38.7-.4 42-.5 3.3-.2 9.8-.3 14.5-.4l8.6-.1.2-11.1c.4-15.6 1.2-20.5 6.4-40.4.5-2.2 1.4-4.8 1.9-5.7.5-1 .9-2.7.9-3.8 0-1.1.398-2.8.898-3.8.5-.9 1.9-4.4 3.1-7.7 1.2-3.3 3.2-8.3 4.6-11.1 1.3-2.8 2.4-5.6 2.4-6.2s.4-1.2.9-1.4c.5-.2 2-2.6 3.5-5.3 3.2-6.1 3.5-6.7 11.3-18.6 5.9-8.9 26-30.5 30.9-33.2 3.6-1.9 9.1-8.8 11.9-15 1.5-3.4 3.3-7.3 3.9-8.6 1.6-3.4 1.4-26.7-.2-28.3-.6-.6-1.2-1.9-1.2-2.8 0-2.1-4-9.8-6.8-12.9-1.3-1.4-3.1-3.8-4-5.3-.9-1.5-2.8-3.2-4.4-3.9-1.5-.6-2.8-1.5-2.8-1.9 0-.5-2.6-2.1-5.7-3.6C291.8 145.5 287 144.2 287 146.3z"/>
								<path fill="#C04C9C" d="M220 149.1c-9.6.4-35.3 1-57 1.3-53.8.8-60.8 1.2-64.2 3.6-1.5 1.1-3.1 2-3.6 2-1.2 0-4.8 5.1-6.6 9.5-2.8 6.6-1.7 15.1 3.2 25.3 3 6 5.1 11 5.8 13.2.4 1.4 1.5 4.1 2.5 6 1.1 1.9 1.9 4.3 1.9 5.2 0 1 .5 1.8 1 1.8.6 0 1 .8 1 1.8s.3 2.1.6 2.5c.8.7 7.4 15.9 7.4 16.9 0 .6 3.1 7.8 8 18.3 1 2.2 2.2 5.1 2.6 6.5.4 1.4 1.5 4.1 2.5 6 1.1 1.9 1.9 3.9 1.9 4.4s1.398 3.8 3.1 7.4c5.3 11.4 11.8 15.6 22.9 15 7.6-.4 15.2-4.4 17.3-9.1.6-1.5 1.5-2.7 1.9-2.7.6 0 2.1-6.9 2.198-10 0-3.2-1.5-8.9-3.4-12.8-1.1-2.3-2-4.5-2-5s-1.3-3.6-3-7-3-6.5-3-6.9c.002-.7-9.098-22.2-12.598-29.9-1.3-2.8-2.4-5.5-2.4-6 0-.6-.9-2.7-2-4.9-1.3-2.5-1.6-4.3-1-4.9.5-.5 9.8-1 20.7-1.2 10.9-.1 26.3-.5 34.3-.9 8-.3 28.2-.8 45-1.1 28.6-.5 34.1-1 37.5-3.6 7.7-5.8 10.5-11.1 10.5-19.6 0-5.1-.5-7.3-2-9.2-1.1-1.4-2-2.8-2-3.2 0-1.4-4.7-5.3-8.9-7.6-4.1-2.1-5.398-2.2-23.398-2-10.602 0-27.102.4-36.702.9zM42.8 252.6c-1.4 3-.5 4.9 3.2 6.9 2.3 1.2 5.7 2.7 7 2.9.3.1 1.9.6 3.5 1.3 2.5 1 7.6 2.1 10.7 2.4.4 0 2.2.5 4 1 4.4 1.4 16.2 2.9 28.1 3.6 8.3.4 9.7.3 9.7-1 0-2.7-11.8-9.2-22.5-12.4-2.7-.8-5.4-1.8-6-2.3-.5-.4-3-1-5.5-1.3-6.5-.9-8.6-1.4-10.9-2.6C63 250.5 58 250 53 250c-8.8 0-9.1.1-10.2 2.6zM100.5 296c-1.1.5-3.3.9-4.9.9-1.6.1-4.6.6-6.5 1.2-2 .7-4.2 1.3-4.9 1.5-.7.2-1.4.4-1.7.5-.2.1-2.8.7-5.7 1.5-7.3 1.8-20.8 6.3-23.8 7.9-1.4.7-4.3 1.6-6.5 2-2.2.4-4.5 1.2-5 1.9-.6.6-1.7 1.2-2.5 1.4-2.3.5-13.1 5.3-14 6.198-.3.3-1.6 1.1-3 1.8-6.5 3.3-7.9 4.4-8.5 6.3-.4 1.2-.2 2.6.4 3.2 1.6 1.6 13.7 1 17.2-.8 1.6-.898 3.1-1.498 3.4-1.398 1 .1 7-1.2 9-2.1 2.8-1.1 8.9-3.5 9.5-3.6.3 0 1.4-.4 2.5-.8 1.1-.5 3.8-1.5 6-2.3 18.6-6.9 45.4-20.9 47.9-25.102.9-1.398-5.6-1.598-8.9-.198zM114 325.5c-3.6 1.8-7.6 3.8-8.9 4.5-2.2 1-5.4 3-20.6 12.9-5.1 3.3-5.5 3.6-8.7 6.3-1.4 1.3-3.9 3.2-5.5 4.3-5.6 4-14.9 14.1-16.7 18.3-2.4 5.4-1.2 9.2 3.1 9.2 3 0 10.5-3.4 13.7-6.3 1.1-.9 2.6-1.7 3.3-1.7.7 0 1.3-.4 1.3-1 0-.5 2.1-2.3 4.6-4.1 5-3.4 42.8-40.8 44.5-44 1.5-3-2.5-2.3-10.1 1.6z"/>
							</svg>
							<p>Bol</p>
						</div>
						<div id={ t('issues.depression.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="depresivno"
							 className="issue depresivno">
							<p className="issue-text">{ t('issues.depression.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="397" height="286" viewBox="0 0 397 286">
								<path fill="#C04C9C" d="M180.5 35.7c-6 .7-11.9 1.8-13 2.2-1.1.5-4.6 1.5-7.8 2.2-3.2.7-6 1.6-6.3 2.1-.3.4-1.5.8-2.8.8-1.2 0-4.1.9-6.4 2-2.2 1.1-4.8 2-5.7 2-.8 0-1.5.4-1.5 1 0 .5-.6 1-1.3 1-1.7 0-17.7 8.1-21.7 11-1.5 1.1-3.1 2-3.5 2-.5 0-8 5.3-11.2 8-.7.5-1.5 1-1.8 1-.6 0-12.2 9.2-17.8 14-4.2 3.6-19.3 18.8-25.7 25.8-6 6.5-7 7.7-11.4 13.7-1.7 2.2-3.2 4.2-3.5 4.5-.4.3-2.1 2.7-3.9 5.3-3.5 4.9-3.7 8-.9 10.9.7.7 2.6 3.1 4.2 5.3 1.7 2.2 3.2 4.2 3.5 4.5s2 2.4 3.7 4.7c4.1 5.3 4.2 8.7.3 15.3-1.6 2.8-3 5.7-3 6.5 0 .7-.4 1.5-.8 1.7-1 .4-12.2 23.1-12.2 24.7 0 .6-.6 2.2-1.4 3.4-5.9 9.1-8.1 28.1-4.1 36.1C26.7 252 35.9 262 37.8 262c.7 0 2.3.6 3.5 1.4 4 2.6 12.8 3.8 18.5 2.5 20.3-4.3 31.2-22.6 25-41.9-.6-1.9-1.7-4.9-2.5-6.7-.7-1.7-1.3-3.4-1.3-3.7 0-.6-5-11.8-8.1-17.9-4-8.1-1.5-8.9 5.8-2 7.4 7 29 23.3 30.9 23.3.3 0 1.9.9 3.4 2 4.7 3.4 15.1 9 16.6 9 .8 0 1.4.4 1.4 1 0 .5.8 1 1.8 1s2.2.4 2.7.9c.6.4 4.2 2 8 3.4 3.9 1.4 7.9 2.9 9 3.3 17 6.2 43.8 9.5 62.1 7.5 6-.7 13.6-1.4 16.9-1.7 3.3-.3 6.4-1 7-1.5.5-.5 1.6-.9 2.5-.9 2.6 0 19.2-5.6 24.9-8.4 3-1.4 6.3-2.6 7.2-2.6 1 0 1.9-.3 2.1-.8.2-.4 2.6-1.8 5.3-3.2 5-2.5 10.9-6.1 13.2-8 .7-.5 1.7-1 2.3-1s2-.8 3.1-1.8c1-1.1 3.1-2.5 4.6-3.3 1.5-.8 3.7-2.3 4.9-3.4 3.6-3.2 5.3-4.5 6-4.5.4 0 1.4-.8 2.3-1.8.9-.9 3.3-3 5.3-4.5 4.5-3.4 28.3-27 32-31.7 1.4-1.9 4.2-5.3 6.2-7.5s3.6-4.3 3.6-4.6c0-.3.8-1.5 1.8-2.7.9-1.1 2.5-3 3.5-4.1.9-1.2 1.7-2.8 1.7-3.5 0-.8.5-1.6 1-1.8 1.5-.5-3.1-10.2-6-12.8-.3-.3-2.4-2.8-4.5-5.5-2.2-2.8-5.2-6.2-6.7-7.7-1.6-1.4-2.8-2.9-2.8-3.2 0-1.5-14-16-24.1-24.7-3.3-3-8-7.1-10.2-9.1-2.3-2.1-4.5-3.8-5-3.8-.4 0-2.1-1.4-3.9-3-1.7-1.7-3.5-3-4.1-3-.5 0-2.3-1.1-4.1-2.5-3.8-3.1-4.6-3.6-7.5-5.3-7.3-4.2-9.3-5.2-10.6-5.2-.8 0-1.5-.4-1.5-.8 0-.5-4.2-2.8-9.2-5.1-5.1-2.4-10.6-4.9-12.2-5.7-1.6-.8-4.2-1.4-5.7-1.4s-3-.4-3.3-.9c-.3-.5-3-1.4-5.8-2.1-2.9-.6-6.4-1.6-7.8-2-4.5-1.7-26.7-4-36.2-3.9-5.1.1-14.2.8-20.3 1.6zm-45 49c-.3 1.6-1.1 2.9-1.6 3.1-.5.2-.9 1.4-.9 2.7s-.4 2.7-1 3c-.5.3-1 1.7-1 3.1 0 1.3-.4 2.4-.9 2.4s-1.1 1.5-1.4 3.2c-.3 1.8-1.1 6-1.7 9.3-1.3 6.4-.7 22.6 1 28.2.6 1.8 1.5 5 2.1 7 1.5 5.4 6.5 17 7.9 18.3.3.3 1.3 1.7 2.3 3.3 2.8 4.3 11.2 13.5 15.4 16.7 8.2 6.3 20.3 13 23.7 13 1.3 0 2.6.3 3 .7 4 4 41.2 4 45.2 0 .4-.4 1.7-.7 3-.7 2 0 15.2-6.4 16.4-8 .3-.3 2.5-2 5-3.7 7-4.8 16-14.9 19.7-22.1.9-1.7 2-3.2 2.5-3.2.4 0 .8-.6.8-1.3s.9-3.2 2-5.5c1.1-2.2 2-4.8 2-5.6 0-.8.4-1.7.9-2 2.2-1.4 3.4-29.5 1.7-39.6-.9-5.6-3.1-12.1-5.7-17.2-1.3-2.5-1.1-3.8.4-3.8 1.8 0 6.7 2.4 6.7 3.2 0 .5.6.8 1.4.8.8 0 1.6.3 1.8.7.2.5 2.1 2 4.4 3.6 2.2 1.5 4.9 3.5 6 4.5 1 .9 4.1 3.5 6.9 5.7 2.7 2.2 7.1 6.1 9.8 8.7 2.6 2.7 5.2 4.8 5.7 4.8.6 0 1 .4 1 .9s2.4 3.4 5.3 6.3c7.6 7.9 11.7 13.1 11.7 14.9 0 .8-1.7 3.5-3.7 6-5.2 6.1-27.2 28-30.7 30.4-1.6 1.1-4.4 3.5-6.3 5.3-1.9 1.7-4.1 3.2-4.8 3.2s-1.5.4-1.7.8c-.1.5-2.8 2.5-5.8 4.5-3 2.1-6.4 4.4-7.5 5.3-1.1.8-3 1.7-4.2 2-1.3.4-2.3 1-2.3 1.5s-.9.9-2 .9-2 .3-2 .8c0 .4-1.5 1.3-3.2 2.1-4 1.6-11.3 4.9-15 6.8-1.4.7-3.7 1.3-5 1.3s-2.8.4-3.3.8c-1.4 1.2-8.7 3.2-11.7 3.2-1.3 0-2.9.5-3.4 1-.7.7-8.8 1.1-21.9 1.1-13.1 0-21.2-.4-21.9-1.1-.5-.5-2.1-1-3.4-1-3 0-10.3-2-11.6-3.2-.6-.4-2.2-.8-3.6-.8s-3.5-.7-4.6-1.5c-1-.8-2.5-1.5-3.1-1.5-1.7 0-18.7-8.2-19.1-9.2-.2-.4-1.2-.8-2.2-.8s-2-.4-2.2-.8c-.1-.4-2.5-2.1-5.3-3.7-2.7-1.5-5.7-3.7-6.6-4.7s-2-1.8-2.5-1.8c-2.4 0-23.5-18.1-35-30-11.2-11.6-13.6-15-12.9-18 .4-1.4 1.1-2.7 1.6-2.8.5-.2.9-.8.9-1.4 0-1.7 32.8-33.8 34.5-33.8.4 0 1.2-.6 1.9-1.3.7-.6 2.5-2.1 4-3.2 1.6-1.1 4.8-3.5 7.1-5.3 2.4-1.7 4.9-3.2 5.4-3.2.6 0 1.1-.5 1.1-1 0-.6.6-1 1.3-1 .8 0 2.2-.9 3.3-1.9 1-1.1 3-2 4.3-2 2-.1 2.2.2 1.6 2.6zm44.4 3.9c3.4.7 10.7 8.6 11.6 12.5 1.6 7.7.4 17-2.6 20.3-1.1 1.1-1.9 2.3-1.9 2.6 0 .4-2.1 1.8-4.7 3.1-5.5 2.8-15.3 3.3-19.9.9-4.2-2.2-10.1-8.8-10.8-12.1-.3-1.6-.9-4.2-1.2-5.9-1-4.8 1.6-11.7 6.3-16.5 4-4.2 5.3-4.9 11.3-5.8 2.5-.4 7.3 0 11.9.9z"/>
							</svg>
							<p>Depresivno</p>
						</div>
						<div id={ t('issues.kids.name') }
							 onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="djete"
							 className="issue djete">
							<p className="issue-text">{ t('issues.kids.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="300" height="399" viewBox="0 0 300 399">
								<path fill="#C04C9C" d="M59.9 303.5c0 2.2.2 3 .4 1.7.2-1.2.2-3 0-4-.3-.9-.5.1-.4 2.3zM59.9 314c0 3.6.2 5 .4 3.2.2-1.7.2-4.7 0-6.5-.2-1.7-.4-.3-.4 3.3z"/>
								<circle fill="#C04C9C" cx="145.5" cy="72" r="57.5"/>
								<path fill="#C04C9C" d="M275 152.5c-10-11.5-26.8-14.3-26.8-14.3H54.6C27.5 142 14 163 14 163c-3.5 6.5-8 21-8 21v149c-1 9 5.5 20 5.5 20 12 22.5 40.5 29.5 40.5 29.5l106-1c12-1 18.5-13.3 18.5-13.3 5-17.8-1.6-28.7-1.6-28.7-3.6-12-19.9-17.1-19.9-17.1H65V277s.5 11 1.6-.2S77.9 261 77.9 261H210c16.5 1.5 23.3 13.5 23.3 13.5l1.8 108c18.6 2.5 31.994-8.4 40.9-17 14.5-14 17.5-32 17.5-32V199c.5-29.5-18.5-46.5-18.5-46.5zM148.5 239c-19.605 0-35.5-15.894-35.5-35.5 0-19.605 15.895-35.5 35.5-35.5 19.606 0 35.5 15.895 35.5 35.5 0 19.606-15.894 35.5-35.5 35.5z"/>
							</svg>
							<p>Dijete</p>
						</div>
					</div>
					<div className="row-3">
						<div id={ t('issues.panic.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="panika"
							 className="issue panika">
							<p className="issue-text">{ t('issues.panic.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="70.5" height="65.5">
								<path fill="#c04c9c" d="M61.384 4.729c-1.628 7.321-2.467 14.833-2.547 22.333-.044 6.697.586 13.598 2.375 20.066 1.174 4.283 2.907 8.396 5.289 12.15-1.729 1.074-3.708 1.684-5.751 1.675-3.976.003-7.945-2.434-9.069-6.373-.349 1.121-.879 2.142-1.688 2.993-2.466 2.662-6.597 3.537-10.038 2.658-2.991-.762-5.611-2.852-6.443-5.905-1.09 3.956-5.086 6.121-8.999 6.141-3.958.05-8.055-2.167-9.169-6.158-1.057 3.785-4.745 6.45-8.612 6.634-1.634.111-3.151-.285-4.681-.796.07-.731.484-1.446.742-2.134 3.452-8.252 7.925-16.105 13.316-23.244 6.661-8.794 14.753-16.44 24.33-21.98 6.493-3.799 13.59-6.48 20.945-8.06z"/>
							</svg>
							<p>Panika</p>
						</div>
						<div id={ t('issues.fobia.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="fobia"
							 className="issue fobia">
							<p className="issue-text">{ t('issues.fobia.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="390" height="395" viewBox="0 0 390 395">
								<path fill="#C04C9C" d="M211.09 81.802v-12.82c4.98-1.01 9.518 2.615 11.484 9 .916 2.972.895 6.4 2.4 8.978 1.527 2.616 4.385 4.47 6.714 6.6 2.682 2.45 5.915 4.474 8.014 7.338 2.724 3.72 4.457 2.132 6.485-.246 3.498-4.1 7.025-8.177 10.4-12.374C261.513 82.152 267.013 76.34 271 69.64c5.256-8.836 9.247-18.422 13.85-27.654 4-8.023 7.823-16.153 12.233-23.948 3.07-5.424 12.473-8.424 16.876-6.106 7.79 4.1 11.04 12.01 7.447 19.557-5.56 11.675-11.48 23.18-17.332 34.716-4.138 8.156-8.09 16.436-12.754 24.286-2.827 4.76-6.706 8.934-10.372 13.146-7.146 8.214-14.47 16.274-21.732 24.387-1.187 1.325-2.63 2.462-3.605 3.92-.832 1.243-1.703 2.898-1.52 4.228.114.812 2.18 1.912 3.382 1.93 10.83.148 21.77.996 32.453-.27 6.03-.716 11.703-4.882 17.422-7.727 9.058-4.506 18.006-9.232 27.027-13.812 3.507-1.78 6.965-3.778 10.666-5.028 5.514-1.863 11.09-2.144 15.75 2.364 4.816 4.66 5.31 10.69 2.664 16.015-1.82 3.66-5.775 6.826-9.515 8.853-9.643 5.227-19.707 9.666-29.574 14.48-7.342 3.58-14.562 7.418-21.994 10.798-2.62 1.192-5.693 1.874-8.574 1.918-12.996.2-25.996.018-38.994.165-1.934.02-3.857 1.062-5.785 1.634 1.345 1.17 2.523 2.664 4.063 3.456 14.327 7.375 28.66 14.746 43.142 21.808 2.536 1.237 5.777 1.404 8.696 1.422 20 .117 39.997.032 59.995.08 6.832.016 13.06 4.476 13.887 9.736 1.255 7.985-1.846 14.502-8.678 16.948-2.824 1.01-6.086 1.077-9.15 1.094-20.64.106-41.284-.173-61.916.228-8.668.168-15.272-4.43-22.408-7.83-12.93-6.16-25.637-12.788-38.508-19.077-1.355-.663-3.182-.36-4.79-.504.826 1.308 1.524 2.72 2.502 3.905 3.782 4.584 7.71 9.047 11.476 13.643 5.43 6.627 10.705 13.38 16.153 19.99 8.677 10.53 17.42 21.003 26.177 31.466 5.19 6.2 11.282 11.83 15.465 18.64 4.424 7.206 7.204 15.45 10.452 23.342 6.534 15.877 13.35 31.662 19.146 47.81 3.007 8.375 3.82 15.5-4.96 20.822-4.954 3.002-15.28 1.64-18.044-4.688-3.88-8.884-7.723-17.788-11.35-26.778-5.576-13.827-10.5-27.94-16.64-41.508-2.51-5.548-7.34-10.094-11.343-14.906-7.46-8.97-15.082-17.802-22.654-26.676-.31-.36-.802-.565-1.777-1.23-.822 1.654-1.64 3.147-2.328 4.7-4.943 11.158-10.457 21.993-19.8 30.206-8.926 7.844-19.017 13.287-31.366 12.604-8.228-.454-15.326-3.93-22.074-8.596-12.648-8.744-19.19-21.7-25.2-35.118-.328-.734-.61-1.512-1.07-2.158-.372-.52-.977-.877-1.75-1.537-8.892 10.666-17.447 21.505-26.62 31.793-12.227 13.715-15.71 31.473-22.84 47.534-4.45 10.03-8.067 20.434-12.604 30.42-2.925 6.44-6.714 7.98-15.715 7.272-4.49-.354-7.945-4.043-9.346-9.54-1.933-7.586 1.73-14.004 4.21-20.64 4.183-11.188 8.356-22.39 12.89-33.437 3.918-9.542 7.955-19.074 12.684-28.227 2.45-4.743 6.386-8.762 9.88-12.916 11.236-13.366 22.68-26.56 33.847-39.983 8.305-9.983 16.277-20.243 24.47-30.32.912-1.12 2.454-1.715 3.424-2.803.644-.723.79-1.89 1.16-2.856-1.127-.178-2.5-.865-3.346-.456-9.936 4.807-19.792 9.778-29.67 14.706-7.96 3.97-15.83 8.13-23.93 11.793-2.41 1.09-5.453 1.055-8.208 1.064-22.046.082-44.092.03-66.138.067-6.526.012-11.385-3.613-13.69-8.85-1.87-4.246-2.278-10.327 1.945-13.875 3.158-2.653 7.715-4.933 11.722-5.06 17.314-.543 34.67-.673 51.98-.06 9.653.34 18.097-1.92 26.42-6.467 11.235-6.138 22.776-11.715 34.144-17.613 1.138-.59 1.99-1.736 2.973-2.625-1.364-.64-2.72-1.82-4.092-1.84-11.496-.15-23.016-.504-34.487.054-8.338.405-15.52-2.2-22.628-5.847-13.588-6.97-27.206-13.88-40.79-20.86-2.86-1.47-5.58-3.218-8.442-4.687-4.75-2.437-6.29-8.783-4.34-16.272 1.117-4.287 6.3-7.62 11.428-8.095 6.944-.642 12.22 3.383 17.854 6.105 13.13 6.348 25.983 13.266 39.046 19.756 2.417 1.2 5.28 2.014 7.96 2.08 9.825.242 19.662.17 29.492.005 1.378-.024 3.546-.948 3.892-1.956.4-1.166-.43-3.213-1.38-4.313-9.888-11.465-19.45-23.264-30.025-34.07-9.76-9.974-13.586-23.037-20.22-34.616-4.635-8.088-8.77-16.477-12.825-24.878-1.773-3.675-3.375-7.623-4.01-11.613-1.075-6.745 4.022-13.737 10.776-15.26 7.135-1.61 12.764 2.472 16.27 9.37 8.974 17.664 17.223 35.728 26.92 52.98 4.164 7.405 11.24 13.16 16.91 19.737 2.03 2.356 3.757 4.973 5.735 7.377 2.146 2.608 4.053 3.644 6.522-.104 1.68-2.55 4.134-4.968 6.802-6.407 5.816-3.138 8.44-7.94 10.004-14.1.896-3.528 3.085-6.87 5.277-9.868 1.037-1.418 3.446-1.832 6.146-3.145v14.562c9.973-.003 19.423-.003 29.284-.003z"/>
							</svg>
							<p>Fobia</p>
						</div>
						<div id={ t('issues.violence.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="sukob"
							 className="issue sukob">
							<p className="issue-text">{ t('issues.violence.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="408" height="417" viewBox="0 0 408 417">
								<g fill="#C04C9C">
									<path d="M159.757 292.122c-.69.4-.828.546-.977.558-10.805.852-11.02.872-9.96 11.377 1.796 17.817 4.112 35.584 5.76 53.414.673 7.274.177 14.656.21 21.988.015 3.72.15 7.445.01 11.16-.383 10.157-11.263 13.51-18.584 11.632-8.497-2.177-11.797-7.3-12.08-16.312-.504-16.15-.707-32.34-2.083-48.424-1.172-13.697-3.758-27.277-5.85-40.89-.6-3.913-5.67-5.2-14.417-3.752-3.625.6-4.174 3.16-3.613 6.316.283 1.59.57 3.222.517 4.823-.59 17.894-.696 35.828-2.092 53.66-.84 10.73-3.467 21.353-5.75 31.924-2.147 9.938-12.64 14.085-21.384 8.835-6.486-3.894-8.597-10.212-7.49-18.126 2.07-14.812 3.696-29.696 5.13-44.586.775-8.063.973-16.2 1.042-24.308.044-5.104-.342-10.265-1.186-15.29-.22-1.307-2.81-2.988-4.435-3.14-4.627-.428-9.327-.317-13.983-.103-3.347.153-4.14-1.278-4.37-4.39-.85-11.437 3.06-21.77 7.015-32.096 6.613-17.26 16.45-32.803 25.74-48.672 3.677-6.284 5.757-13.54 8.273-20.46 3.53-9.703 6.793-19.503 10.146-29.27.4-1.168.648-2.39.03-4.64-2.585 1.41-5.303 2.624-7.733 4.266-13.238 8.94-26.406 17.984-39.597 26.994-3.146 2.15-10.886 1.616-13.884-.96-9.444-8.115-9.844-19.976.05-27.25 11.853-8.718 24.345-16.585 36.734-24.55 11.34-7.29 22.894-14.253 34.39-21.3 6.506-3.99 12.896-8.227 19.676-11.692 10.376-5.306 24.85-2.148 32.792 6.67 8.86 9.842 18.358 19.113 27.68 28.53 3.857 3.896 8.08 7.425 11.943 11.313 2.304 2.32 4.05 2.208 6.226-.118 6.807-7.274 14.18-14.07 20.49-21.747 8.055-9.8 22.478-7.202 28.247 1.077 1.67 2.396 2.803 2.957 5.572 1.84 9.43-3.797 18.992-7.265 28.506-10.854 4.2-1.584 8.4-3.16 13.096-4.925v10.388c-16.396 5.705-30.375 15.43-42.023 27.972-4.847 5.22-7.343 12.74-10.476 19.416-6.543 13.946-12.777 28.038-19.207 42.04-.576 1.255-1.64 2.287-3.55 3.023 2.112-16.3 4.226-32.602 6.34-48.902-.382-.217-.763-.433-1.145-.648-5.26 4.658-10.41 9.445-15.81 13.934-3.977 3.304-7.75 6.79-13.628 7.056-6.637.3-10.658-3.657-14.755-7.565-8.837-8.428-17.457-17.082-26.167-25.644-2.882-2.832-5.1-2.516-6.228.967-3.88 11.988-7.88 23.943-11.457 36.02-.92 3.105-1.152 6.762-.51 9.923 3.686 18.155 7.886 36.206 11.6 54.356 2.654 12.99 4.82 26.076 7.21 39.146z"/>
									<path d="M335.57 192.91c-1.664 1.39-3.102 2.108-3.832 3.27-10.78 17.154-18.383 35.684-25.308 54.72-9.466 26.023-12.077 52.748-10.354 79.887 1.09 17.165 4.53 34.195 7.24 51.234.994 6.25 1.03 11.984-4.414 16.128-5.482 4.17-11.808 4.808-18.27 2.76-8.676-2.75-12.116-9.65-13.238-17.97-2.154-15.965-4.525-31.917-6.022-47.948-1.047-11.21-1.187-22.552-.976-33.82.135-7.19 1.656-14.353 2.535-21.53.163-1.313.306-2.64.32-3.962.032-2.917.87-6.753-3.187-7.17-1.854-.19-4.535 1.89-5.904 3.664-13.114 16.99-21.435 36.11-26.65 56.976-4.816 19.257-4.74 38.646-4.692 58.16.023 9.654-6.274 16.005-16.45 16.682-9.746.647-17.027-5.25-18.157-14.554-2.19-18.045-.885-35.905 1.82-53.83 3.193-21.164 9.37-41.3 19.235-60.214 8.372-16.05 18-32.033 33.04-42.05 11.243-7.484 11.54-18.99 16.772-28.625 6.12-11.27 11.038-23.214 17.45-34.303 6.634-11.474 13.933-22.65 21.9-33.235 5.31-7.058 11.937-13.27 18.645-19.09 6.554-5.688 22.398-5.2 30.1.027 6.275 4.26 12.252 8.877 14.536 16.563 1.015 3.414 1.864 6.985 2.036 10.522.89 18.337 4.54 36.187 10.002 53.6 4.553 14.518 9.91 28.8 15.357 43.015 4.75 12.397 2.742 20.994-7.312 27.62-9.004 5.933-18.687 3.078-22.466-6.975-6.21-16.518-12.25-33.103-18.106-49.748-2.16-6.144-3.6-12.542-5.647-19.804zM353.258 105.26c-19.727-.463-39.02-15.458-36.022-41.708 1.854-16.23 15.384-31.007 35.075-31.02 22.817-.015 36.788 16.952 36.836 35.25.065 24.348-17.335 36.37-35.888 37.478zM191.775 54.448c.777 18.13-14.995 34.5-34.352 34.257-20.32-.254-33.938-15.492-34.386-34.186-.48-19.973 15.75-35.287 34.683-35.29 19.667-.005 35.387 17.586 34.055 35.218z"/>
								</g>
							</svg>
							<p>Sukob</p>
						</div>
						<div id={ t('issues.stuck.name') }
							onMouseEnter={this.handleMouseEnter}
							 onMouseLeave={this.handleMouseLeave}
							 ref="zaglavili"
							 className="issue zaglavili">
							<p className="issue-text">{ t('issues.stuck.description') }</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="452" height="397" viewBox="0 0 452 397">
								<g fill="#C04C9C">
									<path d="M269.59 380.82c-4.777 0-9.11.274-13.375-.156-1.38-.14-3.516-2.003-3.69-3.294-.997-7.438-1.62-14.932-2.167-22.422-1.43-19.61-2.705-39.233-4.146-58.843-.506-6.883-1.19-13.76-2.062-20.604-.303-2.363-1.426-4.622-2.174-6.93l-1.896.057c-1.767 5.01-4.16 9.896-5.156 15.053-1.553 8.046-1.818 16.336-3.262 24.41-1.37 7.66-3.554 15.176-5.384 22.754-.116.48-.33.94-.4 1.423-1.375 9.366-2.226 18.847-4.27 28.062-1.443 6.493-1.222 14.164-8.162 18.306-3.585 2.14-7.302 4.062-11.007 5.99-.52.27-1.44.25-1.956-.034-3.89-2.136-7.944-4.066-11.53-6.642-6.256-4.492-5.96-11.173-5.126-17.864.102-.82.21-1.64.344-2.455 1.77-10.66 3.515-21.323 5.327-31.976 1.538-9.043 3.035-18.096 4.77-27.102 1.64-8.505 3.64-16.94 5.347-25.432 1.26-6.264 2.353-12.562 3.433-18.86 1.13-6.6 2.168-13.216 3.227-19.827.82-5.116 8.692-12.012 13.994-12.27 3.082-.15 6.188-.176 9.226-.633 1.57-.237 3.99-1.01 4.295-2.05.47-1.6.088-4.49-1.05-5.34-4.865-3.63-9.594-7.467-16.414-7.443-43.997.154-87.995.216-131.99-.03-9.643-.054-22.213 12.41-22.738 22.397-1.01 19.218-3.385 38.362-5.12 57.545-.4 4.442-.334 8.93-.77 13.37-1.128 11.476-2.416 22.937-3.645 34.404-.053.492-.185.98-.22 1.472-1.02 14.3-2.03 28.6-3.052 42.897-.033.48-.174.95-.326 1.742h-16.25c1.14-10.43 2.276-20.84 3.435-31.246.07-.646.446-1.262.488-1.903 1.028-15.512 1.824-31.043 3.093-46.535 1.426-17.4 3.28-34.768 4.94-52.15.36-3.788 1.122-7.6.95-11.364-.36-7.868.896-15.36 3.15-22.89 1.93-6.45.864-7.372-5.94-7.632-.816-.03-1.63-.13-3.634-.295 0-7.404-.137-14.77.06-22.123.095-3.61 3.076-3.118 5.53-3.118 40 .003 79.996.005 119.994.002 30.832-.002 61.663-.02 92.495-.008 6.958.003 6.96.05 6.968 6.972.004 4.167-.145 8.34.04 12.498.185 4.12-1.244 6.396-5.677 6.12-.982-.063-1.994.075-2.973.24-3.816.645-4.882 2.678-3.303 6.28 3.775 8.616 3.73 8.453 13.927 8.248 7.632-.152 15.274.336 22.91.36 8.483.027 11.296-4.546 8.33-12.667-2.127-5.822-3.56-11.898-5.69-17.72-3.426-9.373-6.91-18.743-10.946-27.86-1.177-2.664-1.122-3.843.733-5.92 7.824-8.757 15.59-17.58 23.015-26.675 2.87-3.515 5.03-7.69 7.073-11.783 4.368-8.744 3.087-18.64-4.166-25.18-10.585-9.546-20.858-8.457-30.3 1.213-6.04 6.188-10.392 14.026-15.72 21.43-.568-.65-1.405-1.16-1.49-1.774-1.644-11.74 4.165-25.784 13.213-32.87 7.694-6.027 17.062-6.854 25.343-4.498 11.973 3.403 22.437 10.3 28.982 21.862 5.068 8.954 11.008 17.42 15.943 26.44 3.498 6.39 6.145 13.273 8.854 20.062 4.054 10.16 8.003 20.372 11.65 30.685 1.737 4.913 2.966 10.054 3.915 15.187 1.883 10.188 4.7 20.283 3.443 30.854-1.273 10.693-5.178 20.158-12.805 27.86-6.768 6.834-15.58 8.77-24.675 9.05-12.155.37-24.33.09-36.495.09-9.898 0-19.798-.027-29.697.012-6.403.025-7.282 1.222-7.492 7.542-.396 11.982.908 23.707 3.54 35.41 1.073 4.777.128 9.97.603 14.927 1.838 19.19 1.59 38.59 5.717 57.56.343 1.577.045 3.293.045 5.63z"/>
									<path d="M359.332 377.704c-20.996 0-41.992-.077-62.987.07-3.833.026-5.823-.94-5.072-5.05 1.796-9.843 3.632-19.678 5.428-29.52.326-1.784.545-3.588.81-5.383 2.23-15.066 4.373-30.147 6.737-45.192.757-4.818 1.834-9.632 3.36-14.25.37-1.12 3.094-2.063 4.74-2.072 22.83-.13 45.658-.078 68.487-.075 8.33.002 16.664.057 24.994-.048 3.067-.038 4.8.514 5.193 4.237.962 9.095 2.24 18.18 3.886 27.177 1.547 8.46 3.875 16.775 5.55 25.216.638 3.22.05 6.678.655 9.908 1.846 9.832 3.834 19.645 6.11 29.383.985 4.207.105 5.704-4.402 5.67-21.162-.156-42.324-.07-63.486-.07zM242.154 169.156c-11.928-1.008-20.117-6.358-26.59-15.436-6.463-9.063-9.704-19.646-11.768-29.87-2.913-14.432-2.954-29.523-3.18-44.348-.044-2.98 4.037-7.505 7.19-8.66 3.612-1.323 8.348-2.02 12.42 1.84 4.555 4.316 5.605 8.986 5.788 14.965.312 10.2 1.172 20.48 3.026 30.5 1.183 6.387 4.263 12.51 7.05 18.49 3.617 7.757 11.568 4.778 16.88-.05 10.42-9.466 19.444-20.1 26.907-32.173 2.437-3.942 5.994-8.326 11.946-8.252 10.524.13 16.503 11.427 11.558 20.072-4.048 7.077-9.296 13.5-14.315 19.98-3.79 4.895-7.597 9.95-12.226 13.983-6.736 5.867-13.88 11.443-21.52 16.02-3.846 2.303-9.175 2.128-13.166 2.94z"/>
									<path d="M234.346 93.305c-.07-8.01.13-15.014-3.91-21.487-3.7-5.934-8.517-9.313-15.357-9.99-8.825-.87-15.733 2.272-20.744 9.69-1.102 1.633-2.828 2.844-4.266 4.248-1.295-1.536-3.212-2.877-3.773-4.646-1.908-6.027-5.1-12.354-4.597-18.298 1.19-14.083 6.067-27.12 19.51-34.475 6.046-3.31 12.714-5.502 19.164-8.036 1.16-.455 2.727-.427 3.953-.08 15 4.227 28.895 9.42 35.98 25.54 6.66 15.157 4.725 29.11-3.957 42.017-3.925 5.836-9.873 10.89-17.29 13.104-1.334.4-2.527 1.276-4.714 2.415zM187.57 159.175v10.205c-4.928.483-9.8 1.303-14.686 1.376-12.993.193-25.992.066-38.988.066-21.708 0-43.417.082-65.124-.124-2.296-.02-5.484-1.146-6.593-2.845-.984-1.507.16-4.576.764-6.85.206-.772 1.562-1.564 2.513-1.758 5.92-1.203 7.07-4.504 4.33-10.274-2.326-4.893-3.824-10.184-5.61-15.325-1.074-3.084-1.908-6.252-3.01-9.324-2.625-7.31-5.447-14.548-7.997-21.882-2.78-8-5.253-16.11-8.04-24.107-1.6-4.583-3.768-8.97-5.3-13.573-2.057-6.175-4.073-12.398-5.488-18.74-1.06-4.75 4.08-3.87 6.41-5.285.66-.402 4.046 1.937 4.736 3.613 3.554 8.645 6.725 17.45 9.843 26.268C56.53 74 57.18 77.575 58.174 81.037c2.195 7.64 4.14 15.368 6.758 22.86 3.643 10.424 7.892 20.634 11.716 30.996 2.368 6.415 4.65 12.88 6.545 19.443 1.16 4.02 3.498 4.917 7.322 4.902 30.158-.114 60.316-.063 90.475-.063h6.582z"/>
								</g>
							</svg>
							<p>Životna kriza</p>
						</div>
					</div>
				</div>
				<div id="usluge-mobile" className="issues mobile-issues">
					<div id="left" onClick={this.handleSwipeRight} className="issue-arrow-left" />
					<div ref="carousel" className="issue-carousel">
                        { this.renderMobileIssues() }
					</div>
					<div id="right" onClick={this.handleSwipeLeft} className="issue-arrow-right" />
				</div>
				<div className="text-wrapper">
					<h3 className="heading">{ t('heading') }</h3>
					<p className="preamble">{ t('preamble') }</p>
					<a href="/kontakt" className="issue-button">{ t('contactUs') }</a>
				</div>
			</div>

		);
	}
}

Issues.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('issueView')(Issues));

