import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import handwritingActions from '../store/handwriting/actions'
import { selectedChoice, getImage } from '../store/handwriting/selector'

import UserInput from '../components/UserInput'
import HandwrittenDisplay from '../components/HandwrittenDisplay'
import ControlledSelect from '../components/ControlledSelect'

import {
  Row,
  Col,
  Form,
} from 'reactstrap'

const defaultText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Curabitur nisi dui, semper vel feugiat et, lacinia quis ligula.Sed et lectus ac urna porttitor scelerisque at non augue.Nullam volutpat tellus at bibendum tristique.Nulla at dignissim sapien.Integer cursus viverra massa, vel vehicula est dignissim eu.Mauris nunc lorem, ornare a lacus at, sodales dapibus augue.Duis condimentum gravida erat, sit amet pretium ligula elementum non.
\nVestibulum eget accumsan sem.Aliquam placerat sit amet odio at pharetra.Suspendisse nec porttitor diam, eget congue purus.Integer ultrices ante nibh, ac cursus est aliquam sed.In scelerisque orci et lorem rutrum, at condimentum libero vestibulum.Donec aliquet finibus rhoncus.Etiam cursus consectetur lorem vitae consectetur.`

/**
 * Home component
 * @extends PureComponent
 */
class Home extends PureComponent {
  static propTypes = {
    fetchImage: PropTypes.func.isRequired,
    selectChoice: PropTypes.func.isRequired,
    updateText: PropTypes.func.isRequired,

    choices: PropTypes.arrayOf(PropTypes.shape),
    selectedChoice: PropTypes.object,
    handwrittenImage: PropTypes.string,
  }

  /**
   * @async
   * Load handwritings server-side or client-side depending
   * on the context (first load or not)
   */
  static async getInitialProps({ reduxStore }) {
    await reduxStore.dispatch(handwritingActions.fetchChoices(15))
  }

  componentDidMount() {
    const { updateText } = this.props
    // executed only on the client so we don't download the picture
    // on the server
    updateText(defaultText)
  }

  render () {
    const {
      choices,
      selectedChoice,
      selectChoice,
      updateText,
      handwrittenImage,
    } = this.props

    const choiceId = selectedChoice ? selectedChoice.id : ''

    return (
      <>
        <h1>Handwriting</h1>
        <Row>
          <Col>
            <Form>
              <ControlledSelect
                choices={choices}
                selectedChoice={choiceId}
                selectChoice={selectChoice}
              />
              <UserInput
                onChange={updateText}
                defaultText={defaultText}
              />
            </Form>
          </Col>
          <Col>
            {handwrittenImage &&
              <HandwrittenDisplay
                image={handwrittenImage}
              />
            }
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = store => ({
  choices: store.handwriting.choices,
  // using a selector to retrieve the right choice object
  // based on the selectedId
  selectedChoice: selectedChoice(store),
  handwrittenImage: store.handwriting.image,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    selectChoice: handwritingActions.selectChoice,
    fetchImage: handwritingActions.fetchImage,
    updateText: handwritingActions.updateText,
  }, dispatch)

export const home = Home
export default connect(mapStateToProps, mapDispatchToProps)(Home)