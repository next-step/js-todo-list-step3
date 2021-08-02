import { OPTIONS } from './constants.js'

export const selectTemplate = (priority) => {
  return `<select data-event="select" class="chip select ${OPTIONS[priority]}">
        <option value="0" ${priority === 'NONE' && 'selected'}>순위</option>
        <option value="1" ${priority === 'FIRST' && 'selected'}>1순위</option>
        <option value="2" ${priority === 'SECOND' && 'selected'}>2순위</option>
      </select>`
}
