import { todoCountHTMLtTemplate } from '../../utils/templates.js'
import { CLASS_NAME } from '../../utils/constants.js'

TodoCount.prototype.render = function () {
  const $totalCountSpan = this.$target.querySelector(
    `.${CLASS_NAME.TODO_COUNT}`
  )
  const $completedCountSpan = $totalCountSpan.nextElementSibling
  $totalCountSpan.innerHTML = `총 ${todoCountHTMLtTemplate(
    this.totalCount
  )} 개 중`
  $completedCountSpan.innerHTML = `${todoCountHTMLtTemplate(
    this.completedCount
  )} 개 완료`
}

export default function TodoCount(props) {
  if (new.target !== TodoCount) {
    return new TodoCount(props)
  }
  const { $target, totalCount, completedCount } = props
  this.$target = $target
  this.totalCount = totalCount
  this.completedCount = completedCount

  this.render()
}
