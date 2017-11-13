import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import styles from './styles.css';

export class Staff extends Component {
	constructor (props) {
		super(props);

		this.state = {};
	}

	render () {
		return (
			<div className="coworkers">
				<h3>Naši psiholozi</h3>
				<p className="intro">Ovdje smo za vas, ako trebate s kim razgovarati. Zdravlje.nu nudi vam terapiju diskretno i po razumnoj cijeni. Nu nudi vam terapiju diskretno i po razumnoj cijeni</p>
				<div className="cards">
					<div className="card">
						<div className="photo-wrapper">
							<div className="photo-info-wrapper">
								<p>
									Život ne određuju okolnost, već kako ih mi doživljavamo; naši izbori su ti koji dovode do života kakav živimo. Svako želi voditi ispunjen život vrijedan življenja, postati naj bolja verzija sebe, al nekad zaglavimo. Promjenit pogled na događaj i doživljaj mijenja taj događaj i doživljaj. Na taj naćin možemo uspostaviti ravnotežu između pozitivnih i negativnih aspekata ljudskog života, što je formula sretnog života. Tu sam da vam pomognem, da postanete zadovoljniji, sretniji, samopouzdaniji, bez strahova, sumnji, nedoumica oko ispravnosti odluka koje donosite, bez frustracija, depresije i briga.
								</p>
							</div>
							<img src="./images/worker1.jpg"  />
						</div>
						<div className="info-wrapper">
							<div className="title-wrapper">
								<p>Aida Rešić</p>
								<p>Diplomerad psykolog</p>
							</div>
							<div className="diploma-wrapper">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
									<path d="M486.4 51.2H25.6C12.8 51.2 0 64 0 76.8v358.4c0 12.8 12.8 25.6 25.6 25.6h460.8c15.36 0 25.6-12.8 25.6-25.6V76.8c0-12.8-10.24-25.6-25.6-25.6zM58.88 135.68h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm0 102.4h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm256 153.6h-256c-15.36 0-25.6-10.24-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6h256c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6zM435.2 256L384 222.72 332.8 256l12.8-51.2-38.4-51.2h53.76L384 102.4l23.04 51.2h53.76l-38.4 51.2 12.8 51.2z" fill="#6393cf"/>
								</svg>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="photo-wrapper">
							<div className="photo-info-wrapper">
								<p>
									Život ne određuju okolnost, već kako ih mi doživljavamo; naši izbori su ti koji dovode do života kakav živimo. Svako želi voditi ispunjen život vrijedan življenja, postati naj bolja verzija sebe, al nekad zaglavimo. Promjenit pogled na događaj i doživljaj mijenja taj događaj i doživljaj. Na taj naćin možemo uspostaviti ravnotežu između pozitivnih i negativnih aspekata ljudskog života, što je formula sretnog života. Tu sam da vam pomognem, da postanete zadovoljniji, sretniji, samopouzdaniji, bez strahova, sumnji, nedoumica oko ispravnosti odluka koje donosite, bez frustracija, depresije i briga.
								</p>
							</div>
							<img src="./images/worker1.jpg"  />
						</div>
						<div className="info-wrapper">
							<div className="title-wrapper">
								<p>Aida Rešić</p>
								<p>Diplomerad psykolog</p>
							</div>
							<div className="diploma-wrapper">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
									<path d="M486.4 51.2H25.6C12.8 51.2 0 64 0 76.8v358.4c0 12.8 12.8 25.6 25.6 25.6h460.8c15.36 0 25.6-12.8 25.6-25.6V76.8c0-12.8-10.24-25.6-25.6-25.6zM58.88 135.68h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm0 102.4h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm256 153.6h-256c-15.36 0-25.6-10.24-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6h256c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6zM435.2 256L384 222.72 332.8 256l12.8-51.2-38.4-51.2h53.76L384 102.4l23.04 51.2h53.76l-38.4 51.2 12.8 51.2z" fill="#6393cf"/>
								</svg>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="photo-wrapper">
							<div className="photo-info-wrapper">
								<p>
									Život ne određuju okolnost, već kako ih mi doživljavamo; naši izbori su ti koji dovode do života kakav živimo. Svako želi voditi ispunjen život vrijedan življenja, postati naj bolja verzija sebe, al nekad zaglavimo. Promjenit pogled na događaj i doživljaj mijenja taj događaj i doživljaj. Na taj naćin možemo uspostaviti ravnotežu između pozitivnih i negativnih aspekata ljudskog života, što je formula sretnog života. Tu sam da vam pomognem, da postanete zadovoljniji, sretniji, samopouzdaniji, bez strahova, sumnji, nedoumica oko ispravnosti odluka koje donosite, bez frustracija, depresije i briga.
								</p>
							</div>
							<img src="./images/worker1.jpg"  />
						</div>
						<div className="info-wrapper">
							<div className="title-wrapper">
								<p>Aida Rešić</p>
								<p>Diplomerad psykolog</p>
							</div>
							<div className="diploma-wrapper">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
									<path d="M486.4 51.2H25.6C12.8 51.2 0 64 0 76.8v358.4c0 12.8 12.8 25.6 25.6 25.6h460.8c15.36 0 25.6-12.8 25.6-25.6V76.8c0-12.8-10.24-25.6-25.6-25.6zM58.88 135.68h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm0 102.4h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm256 153.6h-256c-15.36 0-25.6-10.24-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6h256c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6zM435.2 256L384 222.72 332.8 256l12.8-51.2-38.4-51.2h53.76L384 102.4l23.04 51.2h53.76l-38.4 51.2 12.8 51.2z" fill="#6393cf"/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Staff.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Staff)
