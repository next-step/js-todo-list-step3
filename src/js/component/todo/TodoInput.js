import { Action } from '../../action/Action.js'
import { $,$$ } from "../../util/domSelection.js";



export class TodoInput {
  //생성되는 시점때문에 이벤트 위임을 사용하려면 전체 ul에 걸어야 하는데 너무 광범위해 보임
  constructor() {
    // const newTodoInput = $("input.new-todo");
    // newTodoInput.addEventListener("keydown",async (e) => {
    //     if (e.key == "Enter") {
    //       //Action.addItem();
    //       newTodoInput.value = "";
    //     }
    // });
  }
  
  render($todoAppContainer){
    const todoInputText = 
    `<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />`;
    const [$inputContainer] = $$('section.input-container',$todoAppContainer);
    $inputContainer.innerHTML = '';
    $inputContainer.insertAdjacentHTML('afterBegin',todoInputText);
    

    const _addItemEvent = (e) =>{
      if (e.target.nodeName=='INPUT' && e.key == "Enter") {
        const inputBox = e.target;
        const teamId = $todoAppContainer.closest('ul').dataset.teamid;
        const memberId = $todoAppContainer.dataset.memberid;
        Action.addItem(teamId,memberId,inputBox.value);
        inputBox.value = "";
      }
    }

    $inputContainer.addEventListener("keydown",_addItemEvent);
  }
}
