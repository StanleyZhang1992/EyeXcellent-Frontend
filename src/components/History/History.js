import React from 'react';

const History = ({name, entries}) => {
	return (
		<div>
			<p className='f3 center'>
				{`${name}, you have tried ${entries} images`}
			</p>
		</div>
	);
}

export default History;