import { todoCountComponentTemplate } from '../../utils/templates.js'

TodoCount.prototype.init = function () {
  const { totalCount, completedCount } = this
  this.setState(totalCount, completedCount)
}

TodoCount.prototype.setState = function (totalCount, completedCount) {
  this.$target.innerHTML = todoCountComponentTemplate(
    totalCount,
    completedCount
  )
}

export default function TodoCount(props) {
  if (new.target !== TodoCount) {
    return new TodoCount(props)
  }
  const { $target, totalCount, completedCount } = props
  this.$target = $target
  this.totalCount = totalCount
  this.completedCount = completedCount

  this.init()
}
