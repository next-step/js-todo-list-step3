//View Action 발생시 상태 변경 및 전파과정
/* 상태변경 과정 */
//1. ActionProvider가 TodoAction(payload와 type으로 이루어짐.)을 Dispatcher로 전달 (dispatch()를 실행하는 방식. ) 
//2. Dispatcher는 미리 등록된 Store들의 CallBack(action)들 실행
//3. 각 Store는 Dispatcher로 부터 전달 받는 Action을 분석하여 자신이 그 대상인지 확인하고 actionType에 알맞게 상태변경을 함.

/* 상태전파 과정 */
//4. Store는 상태변경이 끝난 후 Store.setState를 호출
//5. setState에서는 해당 Store를 바라보고 있는 ControllerView(i.e:TodoApp, 이하 C.V)의 render를 호출함
//6. C.V의 render는 하위 View들의 render를 호출함. 

//Closure Array
const _storeCallBacks= [];
let _promises = [];
//store가 관리해야 할것들? : teamid, userid, todoitems({itemid, text, priority, isCompleted})
//출처 : https://haruair.github.io/flux/docs/todo-list.html
export class Dispatcher{
    //store가 나중에 호출해달라고 부탁한 함수.
    resister(storeCallBack){
        _storeCallBacks.push(storeCallBack);
        return _storeCallBacks.length-1;
    };
    dispatch(action){
        //앞선 store의 callback이 반드시 성공해야만 다음 store의 callback으로 넘어갈 수 있도록 작성
        //Promise API 더 알아보기.
        var resolves = [];
        var rejects = [];
        _promises = _storeCallBacks.map((_, i) => {
            return new Promise((resolve, reject) => {
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        });
        _storeCallBacks.forEach((storeCallBack, i) => {
            Promise.resolve(storeCallBack(action))
                    .then(() => resolves[i](action))
                    .catch(() => rejects[i](new Error(`${i}번째 storeCallback 실행 실패`)));
        });
        _promises = [];
    };
}