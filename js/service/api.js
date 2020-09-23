

export const request = async (url , option) =>{
    try {
        const response = await fetch(url ,option);
        if(response.status !== 200){
            throw new Error(`HTTP 상태 코드가 200이 아닙니다. ${response.status}`);
        }
        return response.json();
    }catch(error){
        throw new Error(error.message);
    }
}

export const options = (method , body) =>{
    if(body){
        body = JSON.stringify(body);
    }
    return {
        method,
        headers : {"Content-Type" : "application/json"},
        body,
    };
};
