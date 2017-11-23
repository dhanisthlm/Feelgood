import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import styles from './styles.css';

export class Staff extends Component {
	constructor (props) {
		super(props);

		this.state = {
			openDiploma: false,
			diploma: '',
			staff: [
				{
					'name': 'davor',
					'fullName': 'Aida Rešić',
					'image': 'worker1.jpg',
					'title': 'Diplomerad psykolog',
					'text': 'Život ne određuju okolnost, već kako ih mi doživljavamo; naši izbori su ti koji dovode do života kakav živimo. Svako želi voditi ispunjen život vrijedan življenja, postati naj bolja verzija sebe, al nekad zaglavimo. Promjenit pogled na događaj i doživljaj mijenja taj događaj i doživljaj. Na taj naćin možemo uspostaviti ravnotežu između pozitivnih i negativnih aspekata ljudskog života, što je formula sretnog života. Tu sam da vam pomognem, da postanete zadovoljniji, sretniji, samopouzdaniji, bez strahova, sumnji, nedoumica oko ispravnosti odluka koje donosite, bez frustracija, depresije i briga.'
				},
                {
                    'name': 'davor',
                    'fullName': 'Irma Banjic',
					'image': 'worker2.jpg',
                    'title': 'Diplomerad psykolog',
                    'text': 'Život ne određuju okolnost, već kako ih mi doživljavamo; naši izbori su ti koji dovode do života kakav živimo. Svako želi voditi ispunjen život vrijedan življenja, postati naj bolja verzija sebe, al nekad zaglavimo. Promjenit pogled na događaj i doživljaj mijenja taj događaj i doživljaj. Na taj naćin možemo uspostaviti ravnotežu između pozitivnih i negativnih aspekata ljudskog života, što je formula sretnog života. Tu sam da vam pomognem, da postanete zadovoljniji, sretniji, samopouzdaniji, bez strahova, sumnji, nedoumica oko ispravnosti odluka koje donosite, bez frustracija, depresije i briga.'
                },
                {
                    'name': 'davor',
                    'fullName': 'Davor Matosevic',
                    'image': 'worker3.jpg',
                    'title': 'Diplomerad psykolog',
                    'text': 'Život ne određuju okolnost, već kako ih mi doživljavamo; naši izbori su ti koji dovode do života kakav živimo. Svako želi voditi ispunjen život vrijedan življenja, postati naj bolja verzija sebe, al nekad zaglavimo. Promjenit pogled na događaj i doživljaj mijenja taj događaj i doživljaj. Na taj naćin možemo uspostaviti ravnotežu između pozitivnih i negativnih aspekata ljudskog života, što je formula sretnog života. Tu sam da vam pomognem, da postanete zadovoljniji, sretniji, samopouzdaniji, bez strahova, sumnji, nedoumica oko ispravnosti odluka koje donosite, bez frustracija, depresije i briga.'
                }
			]

		};

		this.openDiploma = this.openDiploma.bind(this);
		this.closeDiploma = this.closeDiploma.bind(this);
	}

	openDiploma (e) {
        const body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
		this.setState({ diploma: e.currentTarget.id });

		setTimeout(() => {
            this.setState({openDiploma: true})
        }, 200);
	}

	closeDiploma () {
        const body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'scroll';
        this.setState({ diploma: '', openDiploma: false });
	}

	render () {
		const diploma = (this.state.openDiploma === true) ? 'diploma show-diploma' : 'diploma';
		const self = this;

		return (
			<div className="staff">
				<h3 className="heading">Naši psiholozi</h3>
				<p className="preamble">Ovdje smo za vas, ako trebate s kim razgovarati. Zdravlje.nu nudi vam terapiju diskretno i po razumnoj cijeni. Nu nudi vam terapiju diskretno i po razumnoj cijeni</p>
				<div className={diploma}>
					<div className="diploma-open-wrapper">
						<img src={`images/diplom-${this.state.diploma}.jpg`} />
						<svg onClick={ this.closeDiploma } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="512" height="512">
							<path d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm3.2 22.4l7.5 7.5c.2.2.3.5.3.7s-.1.5-.3.7l-1.4 1.4c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-7.5-7.5c-.2-.2-.5-.2-.7 0l-7.5 7.5c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-1.4-1.4c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l7.5-7.5c.2-.2.2-.5 0-.7l-7.5-7.5c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.4-1.4c.2-.2.5-.3.7-.3s.5.1.7.3l7.5 7.5c.2.2.5.2.7 0l7.5-7.5c.2-.2.5-.3.7-.3.3 0 .5.1.7.3l1.4 1.4c.2.2.3.5.3.7s-.1.5-.3.7l-7.5 7.5c-.2.1-.2.5 0 .7z" fill="#c04c9c"/>
						</svg>
					</div>
				</div>
				<div className="cards">
                    {this.state.staff.map(function(person) {
                    	const image = "./images/" + person.image;
                        return (
							<div className="card">
								<div className="photo-wrapper">
									<div className="photo-info-wrapper">
										<p>{person.text}</p>
									</div>
									<img src={image}  />
								</div>
								<div className="info-wrapper">
									<div className="title-wrapper">
										<p>{person.fullName}</p>
										<p>{person.title}</p>
									</div>
									<div id={person.name} className="diploma-wrapper" onClick={ self.openDiploma } >
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
											<path d="M486.4 51.2H25.6C12.8 51.2 0 64 0 76.8v358.4c0 12.8 12.8 25.6 25.6 25.6h460.8c15.36 0 25.6-12.8 25.6-25.6V76.8c0-12.8-10.24-25.6-25.6-25.6zM58.88 135.68h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm0 102.4h153.6c15.36 0 25.6 10.24 25.6 25.6 0 15.36-10.24 25.6-25.6 25.6H58.88c-15.36 0-25.6-12.8-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6zm256 153.6h-256c-15.36 0-25.6-10.24-25.6-25.6 0-15.36 10.24-25.6 25.6-25.6h256c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6zM435.2 256L384 222.72 332.8 256l12.8-51.2-38.4-51.2h53.76L384 102.4l23.04 51.2h53.76l-38.4 51.2 12.8 51.2z" fill="#6393cf"/>
										</svg>
									</div>
								</div>
							</div>
						);
                    })}
				</div>
			</div>
		);
	}
}

Staff.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Staff)
