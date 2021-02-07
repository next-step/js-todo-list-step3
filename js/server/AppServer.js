import {makeMemberList,addItem} from "../App/AddMemberEvent.js";
import {$baseUrl} from "../content/shape.js";

let count = -1;
function responseMemberApi(value,teamId){
  fetch(`${$baseUrl}api/teams/${teamId}`)
    .then((response)=>response.json())
    .then(
      (data)=>{
        data.members.forEach((arr)=>{
          makeMemberList(arr.name, 0,value)
          arr.todoList.forEach((arr,index)=>{
            //새로운 멤버의 할일로 바뀐다면
            if(index==0) {
              count++
            }
            addItem(arr.contents, count)
            document.querySelectorAll('.todo-count > strong')[count].innerHTML = index+1;
          })
        })
      })
}



export {responseMemberApi}
