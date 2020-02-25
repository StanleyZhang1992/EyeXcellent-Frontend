import React from 'react';
import Dialog from './Dialog';
import './AssistantStyle.css';

class DialogBox extends React.Component {
	constructor(){
		super();
		this.state = {isDialogOpen: false}
	}

	openDialog =() => this.setState({ isDialogOpen: true })
	handleClose = () => this.setState({ isDialogOpen: false })

	render(){
		return(
		<div>
			<button className='openButton' type="button" onClick={this.openDialog}>See Results</button>
			{
				this.state.isDialogOpen &&
				<Dialog closeDialog={this.handleClose} data={this.props.data}/>
			}
		</div>
		);
	}

}

export default DialogBox;