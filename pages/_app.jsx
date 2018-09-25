import React from 'react'
import App, { Container } from 'next/app'
import { Container as BSContainer } from 'reactstrap'
import { Provider } from 'react-redux';
import withReduxStore from '../utils/with-redux-store'

import {
  NavLink,
} from 'reactstrap'

/**
 * Global CSS
 */
import './global.scss'

/**
 * Main structure of the app.
 *
 * @extends App
 */
class HandwritingApp extends App {
  /**
   * Bootstrap code from NextJS.
   * Used to retrieve props from the server to display our component.
   */
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Provider store={reduxStore}>
        <Container>
          <BSContainer>
            <Component {...pageProps} />
          </BSContainer>
        </Container>
      </Provider>
    )
  }
}

export default withReduxStore(HandwritingApp)