import Component from '../../core/Component/Component.js'

export default class UserTitle extends Component {
  constructor(target, store) {
    super(target, { store, isLoaded: false })
  }

  template() {
    if (!this.$props.isLoaded) {
      const { name } = this.$props.store.getState()

      if (!name) {
        return `<span>Loading...</span>`
      }

      this.$props.isLoaded = true

      return `<span><strong>${name}</strong>'s Todo List</span>`
    }
  }
}
