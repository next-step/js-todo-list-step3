const _storeCallBacks= [];
const _stores= [];
let _promises = [];
export class Dispatcher{
    register(storeCallBack,store){
        _storeCallBacks.push(storeCallBack);
        _stores.push(store);
        return _storeCallBacks.length-1;
    };
    async dispatch(action){
        var resolves = [];
        var rejects = [];
        _promises = _storeCallBacks.map((_, i) => {
            return new Promise((resolve, reject) => {
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        });

        console.log('do dispatch',action);
        
        for(let i=0 ; i<_storeCallBacks.length;i++){
            
            Promise.resolve(await _storeCallBacks[i].bind(_stores[i])(action))
                    .then(() => resolves[i](action))
                    //.catch(() => rejects[i](new Error(`${i}번째 storeCallback 실행 실패`)));
        }
        // _storeCallBacks.forEach((storeCallBack, i) => {
        //     Promise.resolve(storeCallBack.bind(_stores[i])(action))
        //             .then(() => resolves[i](action))
        //             //.catch(() => rejects[i](new Error(`${i}번째 storeCallback 실행 실패`)));
        // });
        _promises = [];
    };
}