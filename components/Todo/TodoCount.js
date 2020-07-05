import { todoCountComponentTemplate } from '../../utils/templates.js'

TodoCount.prototype.init = function () {
  const { totalCount, completedCount } = this
  this.$target.innerHTML = todoCountComponentTemplate(
    totalCount,
    completedCount
  )
}

TodoCount.prototype.setState = function (totalCount, completedCount) {
  const $totalCountSpan = this.$target.querySelector('#todo-count')
  const $completedCountSpan = this.$target.querySelector('#completed-count')
  $totalCountSpan.innerHTML = `총 <span class="count">${totalCount}</span> 개 중`
  $completedCountSpan.innerHTML = `<span class="count">${completedCount}</span> 개 완료`
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
