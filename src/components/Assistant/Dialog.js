import React from 'react';

const Dialog = ({ closeDialog, data }) => {
	const names = data.map(
		((region) => <li key={region.id} className='black'>{region.data.concepts[0].name}</li>)
	);
	return (
		<div className='DialogContent'>
			<p className='f4'>I see them in the image:</p>
			<ul>{names}</ul>
			<p className='f4'>Go and try another one!</p>
			<button className='closeButton' type="button" onClick={closeDialog}>Got it</button>
		</div>
	)
}

export default Dialog;