import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Grommet } from 'grommet'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Auth0Provider } from './react-auth0-spa'
import history from './utils/history'
import configureStore from './store/configureStore'

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const store = configureStore({})

const theme = {
  maskedInput: {
    extend: {
      border: 'none'
    }
  },
  textInput: {
    suggestions: {
      extend: {
        padding: '5px'
      }
    }
  }
}

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Grommet theme={theme} full className="no-scroll">
      <Provider store={store}>
        <App />
      </Provider>
    </Grommet>
  </Auth0Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
