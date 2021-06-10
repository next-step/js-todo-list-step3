import createStore from '../../core/redux/createStore.js'
import reducer from '../homepageReducer.js'

const store = createStore(reducer)

export { store }
