import ControlledSelect from '../../components/ControlledSelect'

describe('ControlledSelect', () => {
  it('should render correctly with minimal attributes', () => {
    const attrs = {
      selectChoice: fn,
    }
    const component = shallow(<ControlledSelect {...attrs} />)

    expect(component).to.matchSnapshot()
  })

  it('should render correctly with choices', () => {
    const attrs = {
      selectChoice: fn,
      choices: [{
        id: '31SB3NWR00E0',
        title: 'Alder',
      }, {
        id: '31SF81NG00ES',
        title: 'Kelly',
      }],
    }
    const component = shallow(<ControlledSelect {...attrs} />)

    expect(component).to.matchSnapshot()
  })

  it('should correctly display selected choice', () => {
    const selectedChoice = '31SF81NG00ES'
    const attrs = {
      selectChoice: fn,
      choices: [{
        id: '31SB3NWR00E0',
        title: 'Alder',
      }, {
        id: selectedChoice,
        title: 'Kelly',
      }],
      selectedChoice,
    }
    const component = shallow(<ControlledSelect {...attrs} />)
    const select = component.find('#handwriting-styles')

    expect(select.props().value).to.equal(selectedChoice)
  })

  it('should call selectChoice when value changes', () => {
    const selectChoice = spy()
    const value = '31SF81NG00ES'
    const attrs = {
      selectChoice,
      choices: [{
        id: '31SB3NWR00E0',
        title: 'Alder',
      }, {
        id: value,
        title: 'Kelly',
      }],
    }
    const component = shallow(<ControlledSelect {...attrs} />)
    const select = component.find('#handwriting-styles')

    select.simulate('change', { target : { value } } )

    expect(selectChoice.calledOnceWith(value)).to.equal(true)
  })
})