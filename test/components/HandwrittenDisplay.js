import HandwrittenDisplay from '../../components/HandwrittenDisplay'

describe('HandwrittenDisplay', () => {
  it('should render correctly with image URL', () => {
    const attrs = {
      image: 'https://images.unsplash.com/photo-1530518309799-9db5fc42276b?ixlib=rb-0.3.5…EyMDd9&s=b784735…&auto=format&fit=crop&w=2275&q=80',
    }
    const component = shallow(<HandwrittenDisplay {...attrs} />)

    expect(component).to.matchSnapshot()
  })
})