import UserInput from '../../components/UserInput'

describe('UserInput', () => {
  it('should render correctly with defaultText', () => {
    const attrs = {
      defaultText: 'this is a default text',
      onChange: fn,
    }
    const component = shallow(<UserInput {...attrs} />)

    expect(component).to.matchSnapshot()
  })

  it('should call onChange when text changes', () => {
    const onChange = spy()
    const value = 'this is my new text'
    const attrs = {
      defaultText: 'this is a default text',
      onChange,
    }

    // fake the timers to disable the debounced function in UserInput
    // Otherwise expect is called before onChange has been called
    const clock = sinon.useFakeTimers()
    const component = shallow(<UserInput {...attrs} />)
    component.find('#user-input').simulate('change', { target: { value } } )

    // enough time for the debounce function to fire
    clock.tick(2000)

    expect(onChange.calledOnceWith(value)).to.equal(true)
  })
})