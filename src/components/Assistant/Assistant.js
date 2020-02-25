import React from 'react';
import robot from './robot.png';
import DialogBox from './DialogBox';

const Assistant = ({status, data}) => {
	return (
		<div className='ma4 mt1'>
			<img alt='robot' src={robot}/>
			{status && <DialogBox className='tc' data={data}/>}
		</div>
	)
}

export default Assistant;