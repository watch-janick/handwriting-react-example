import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import debounce from 'lodash.debounce'

import {
  Input,
} from 'reactstrap'

/**
 * Minimum delay between two requests
 */
const debounceRate = 400

/**
 * Component used to collect the user input and send it
 * back after each change.
 *
 * @extends PureComponent
 */
class UserInput extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    defaultText: PropTypes.string,
  }

  @autobind // use autobind to make this available in textChanged
  textChanged (e) {
    const value = e.target.value

    this.onChangeDebounced(value)
  }

  /**
   * Debounced function to minimize the number of
   * requests sent to the API.
   */
  onChangeDebounced = debounce(value => {
    const { onChange } = this.props

    onChange(value)
  }, debounceRate)

  render () {
    const { defaultText } = this.props

    return (
      <Input
        type="textarea"
        name="text"
        id="user-input"
        defaultValue={defaultText}
        onChange={this.textChanged}
      />
    )
  }
}

export default UserInput