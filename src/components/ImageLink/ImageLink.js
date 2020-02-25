import React from 'react';
import './imageLinkStyle.css';

const ImageLink = ({onInputChange, onSubmit}) => {
	return (
		<div className='center'>
			<div className='form pa4 br3 shadow-5 center'>
				<input className='f4 pa2 w-70 center' type='tex' placeholder='enter image url here' onChange={onInputChange} />
				<button className='w-30 grow f4 link ph3 pv2 dib black bg-light-blue' onClick={onSubmit}>Submit</button>
			</div>
		</div>
	)
}

export default ImageLink;