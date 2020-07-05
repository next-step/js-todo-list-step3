import { todoCountComponentTemplate } from '../../utils/templates.js'

export default function TodoCount(props) {
  if (new.target !== TodoCount) {
    return new TodoCount(props)
  }
  const { $target, totalCount, completedCount } = props
  this.$target = $target

  this.init = () => {
    this.setState(totalCount, completedCount)
  }

  this.setState = (totalCount, completedCount) => {
    this.$target.innerHTML = todoCountComponentTemplate(
      totalCount,
      completedCount
    )
  }

  this.init()
}
