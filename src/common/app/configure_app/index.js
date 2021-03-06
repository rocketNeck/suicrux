// @flow
// Redux stuff
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
// // Application
import rootReducer from 'reducers'
import {history, getRoutes} from 'routing'
//
/**
 * Configure application store
 * @param  {Object} initialState - preloadedState
 * @return {Object} - configured store
 */
const configureStore = (initialState: Object) => {
	const middlewares = [thunk, routerMiddleware(history)]
	const enhancers = middlewares.map(a => applyMiddleware(a))

	const getComposeFunc = () => {
		if (process.env.NODE_ENV === 'development') {
			const {composeWithDevTools} = require('redux-devtools-extension')
			return composeWithDevTools
		}
		return compose
	}

	const composeFunc = getComposeFunc()
	const composedEnhancers = composeFunc.apply(null, enhancers)

	return createStore(rootReducer, initialState, composedEnhancers)
}

/**
 * Return configured history, routes and store
 * @param  {Object} initialState
 * @return {Object} Object containting configured store, routes, history
 */
export default (initialState: Object) => {
	const routes = getRoutes()
	const store = configureStore(initialState)
	return {
		store,
		routes,
		history
	}
}
