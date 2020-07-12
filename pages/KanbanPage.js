import { KanbanContainer } from '../containers/index.js'
import { CLASS_NAME } from '../utils/constants.js'

try {
  new KanbanContainer({ selector: `.${CLASS_NAME.TODO_APP_LIST_CONTAINER}` })
} catch (e) {
  console.error(e)
}
