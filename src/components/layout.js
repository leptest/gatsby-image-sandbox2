import React from 'react';

export default ({ children }) => (
	<div className="page">
		<div className="page__body">
			<main>
				{children}
			</main>
		</div>
	</div>
);
