import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Assistant from './components/Assistant/Assistant';
import ImageLink from './components/ImageLink/ImageLink';
import History from './components/History/History';
import Intro from './components/Intro/Intro';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import RecognitionSystem from './components/RecognitionSystem/RecognitionSystem';
import Particles from 'react-particles-js';

const particlesParams = {
	particles: {
		number: {
			value: 50,
			density: {
				enable: true,
				value_area: 800
			}
		},
		shape: {
			type: 'star',
		},
		opacity: {
			value: 1,
			random: true,
			anim: {
			  enable: true,
			  speed: 5,
			  opacity_min: 0,
			  sync: false
			}
		},
		size: {
			value: 5,
			random: false,
			anim: {
			  enable: false,
			  speed: 20,
			  size_min: 0,
			  sync: false
			}
		},
		line_linked: {
			enable: false,
			distance: 100,
			color: '#fff',
			opacity: 1,
			width: 1
		},
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'bubble'
        },
        onclick: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 200,
          line_linked:{
            opacity: 5
          }
        },
        bubble:{
          distance: 200,
          size: 20,
          duration: 0.4
        },
        repulse:{
          distance: 300,
          duration: 0.4
        },
        push:{
          particles_nb: 4
        },
        remove:{
          particles_nb: 2
        }
      },
    },
}

const initialState = {
	inputURL: '',
	imageURL: '',
	resultAvailability: false,
	resultData: '',
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends React.Component {
	constructor(){
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}

	onInputChange = (event) => {
		this.setState({inputURL: event.target.value});
	}

	setResultInState = (response) => {
		const names = response.outputs[0].data.regions
		const filteredNames = names.filter(region => region.data.concepts[0].value > 0.5)
		this.setState({resultData: filteredNames});
		this.setState({resultAvailability: true});
	}

	onSubmit = () => {
		this.setState({imageURL: this.state.inputURL});
		fetch('https://enigmatic-garden-62452.herokuapp.com/imageURL', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				input: this.state.inputURL
			})
		})
		.then(response => response.json())
		.then(response => {
			if(response){
				fetch('https://enigmatic-garden-62452.herokuapp.com/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, {entries: count}))
					})
					.catch(console.log)
			}
			this.setResultInState(response)
		})
		.catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({initialState})
		} else if (route === 'home') {
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

	render() {
		const {imageURL, resultAvailability, resultData, route, isSignedIn} = this.state;
		return (
		    <div className="App">
			    <Particles className='particles' params={particlesParams} />
			    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
			    {
		    	route === 'register'
		    	? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		    	: (
		    		route === 'home'
		    		? <div>
	    				<Intro />
					    <Assistant status={resultAvailability} data={resultData}/>
				      	<ImageLink onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
				      	<History name={this.state.user.name} entries={this.state.user.entries} />
				    	<RecognitionSystem imageURL={imageURL} status={resultAvailability} />
		    	 	 </div>
		    		: <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		    	  )
			    }
		    </div>
  		)
	}
}

export default App;
