import React from 'react';
import ReactDOM from 'react-dom';
import '../public/css/style.css'
import Auth from './Auth'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer);


ReactDOM.render(
	<Provider store={store}>
		<Auth />
	</Provider>,
	document.getElementById('app')
);