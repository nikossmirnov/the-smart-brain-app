import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import PageName from '../components/PageName/PageName';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import Navigation from '../components/Navigation/Navigation';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Settings from '../components/Settings/Settings';
import Footer from '../components/Footer/Footer';

const particlesOptions = {
	particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    shape: {
      stroke: {
        width: 2,
        color: '#00436b'
      }
    },
		line_linked: {
			enable: true,
      color: '#000000',
      opacity: 0.8,
      width: 1.2
		}
	}
};

let initialState = {
	input: '',
	imageUrl: '',
	boxes: [],
	isDetecting: false,
	route: 'signIn',
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
};

class App extends Component {
	constructor(props) {
		super(props);

		this.state = initialState;
	}

	onInputChange = event => {
		this.setState({
			input: event.target.value,
			imageUrl: event.target.value,
			boxes: []
		});
	}

	onButtonSubmit = () => {
		this.setState({
			isDetecting: true
		});

		fetch('http://localhost:3000/imageURL', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: this.state.input
			})
		})
		.then(response => response.json())
		.then(response => {
			if (response) {
				fetch('http://localhost:3000/image', {
					method: 'put',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
            id: this.state.user.id
          })
				})
				.then(response => response.json())
				.then(count => {
					this.setState(
						Object.assign(this.state.user, {
							entries: count
						})
					);
				})
				.catch(console.log);
			}
			this.displayFaceBox(this.calculateFaceLocation(response));
		})
		.catch(err => console.log(err));
	}

	calculateFaceLocation = data => {
		const image = document.getElementById('image');
		let width = Number(image.width);
		let height = Number(image.height);

		return data.outputs[0].data.regions.map(face => {
			let clarifaiFace = face.region_info.bounding_box;

			return {
				leftCol: clarifaiFace.left_col * width,
				topRow: clarifaiFace.top_row * height,
				rightCol: width - (clarifaiFace.right_col * width),
				bottomRow: height - (clarifaiFace.bottom_row * height)
			}
		});
	}

	displayFaceBox = boxes => {
		this.setState({
			boxes,
			isDetecting: false
		});
	}

	onRouteChange = route => {
		if (route === 'signOut') {
			this.setState(initialState);
		}

		this.setState({ route });
	}

	loadUser = data => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}});
	}

	updateUserName = newName => {
		this.setState(
			Object.assign(this.state.user, {
				name: newName
			})
		);
	}

	updateUserEmail = newEmail => {
		this.setState(
			Object.assign(this.state.user, {
				email: newEmail
			})
		);
	}

  render() {
		const { route, isDetecting, imageUrl, boxes } = this.state;
		const { id, name, email, entries } = this.state.user;

    return (
      <div className='app'>
        <Particles
					className='particles'
					params={particlesOptions}
				/>
				<Logo />
				<Navigation
					route={route}
					onRouteChange={this.onRouteChange}
				/>
				<PageName
					route={route}
				/>
				{
					route === 'home'
					? <div className='main-content'>
			        <Rank
								name={name}
								entries={entries}
							/>
			        <ImageLinkForm
								isDetecting={isDetecting}
								onInputChange={this.onInputChange}
								onButtonSubmit={this.onButtonSubmit}
							/>
			        <FaceRecognition
								imageUrl={imageUrl}
								boxes={boxes}
							/>
						</div>
					:
						route === 'signIn'
						? <SignIn
								onRouteChange={this.onRouteChange}
								loadUser={this.loadUser}
							/>
					:
						route === 'settings'
						? <Settings
								id={id}
								name={name}
								email={email}
								updateUserName={this.updateUserName}
								updateUserEmail={this.updateUserEmail}
								onRouteChange={this.onRouteChange}
							/>
					:
						<Register
							onRouteChange={this.onRouteChange}
							loadUser={this.loadUser}
						/>
				}
				<Footer />
      </div>
    );
  }
}

export default App;
