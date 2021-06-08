import createStore from '../../core/redux/createStore.js'
import reducer from '../kanbanReducer.js'

const store = createStore(reducer)

export { store }
