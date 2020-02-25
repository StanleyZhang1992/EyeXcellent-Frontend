import React from 'react';

const RecognitionSystem = ({imageURL, status}) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				{status && <img alt='' src={imageURL} width='600px' height='auto' />}
			</div>
		</div>
	)
}

export default RecognitionSystem;