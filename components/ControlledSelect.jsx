import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

import {
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap'

/**
 * Component used to display a selectable list of handwritings
 *
 * @extends PureComponent
 */
class ControlledSelect extends PureComponent {
  static propTypes = {
    selectChoice: PropTypes.func.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape),
    selectedChoice: PropTypes.string,
  }

  @autobind // use autobind to make this available in textChanged
  onChange(e) {
    const { selectChoice } = this.props
    const choiceId = e.target.value

    selectChoice(choiceId)
  }

  render() {
    const {
      choices,
      selectedChoice,
    } = this.props

    const value = selectedChoice || ''

    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">Handwriting style</InputGroupAddon>
        <Input
          type="select"
          onChange={this.onChange}
          value={value}
          id="handwriting-styles"
        >
          {choices && choices.map(({ id, title }) =>
            <option key={id} value={id}>{title}</option>
          )}
        </Input>
      </InputGroup>
    )
  }
}

export default ControlledSelect