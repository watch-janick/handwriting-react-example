import { home as Home } from '../../pages'

describe('Home', () => {
  it('should render correctly with minimal attributes', () => {
    const attrs = {
      fetchImage: fn,
      selectChoice: fn,
      updateText: fn,
    }
    const component = shallow(<Home {...attrs} />)

    expect(component).to.matchSnapshot()
  })

  it('should render correctly with full attributes', () => {
    const attrs = {
      fetchImage: fn,
      selectChoice: fn,
      updateText: fn,
      choices: [{
        id: '31SB3NWR00E0',
        title: 'Alder',
      }, {
        id: '31SF81NG00ES',
        title: 'Kelly',
      }],
      selectedChoice: {
        id: '31SF81NG00ES',
        title: 'Kelly',
      },
      handwrittenImage: 'https://images.unsplash.com/photo-1530518309799-9db5fc42276b?ixlib=rb-0.3.5…EyMDd9&s=b784735…&auto=format&fit=crop&w=2275&q=80',
    }
    const component = shallow(<Home {...attrs} />)

    expect(component).to.matchSnapshot()
  })
})