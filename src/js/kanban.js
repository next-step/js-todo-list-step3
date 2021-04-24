import { KanbanApp } from "./app/KanbanApp.js";
import { KanbanStore } from "./store/KanbanStore.js";

const _getUrlParams = () => {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}
const kanbanApp = new KanbanApp();
const kanbanStore = new KanbanStore(_getUrlParams().id,kanbanApp)
kanbanStore.init();
