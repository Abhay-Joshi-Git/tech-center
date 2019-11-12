import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = ({ className, showBackground = false }) => (
	<div className="loading-container">
		<div className="loader"></div>
	</div>
)

export default LoadingIndicator;