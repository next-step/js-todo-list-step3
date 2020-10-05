

export const request = async (url , option) =>{
    try {
        const response = await fetch(url ,option);
        if(response.status !== 200){
            throw new Error(`HTTP 상태 코드가 200이 아닙니다. ${response.status}`);
        }
        return response.json();
    }catch(error){
        console.log(error);
    }
}

export const options = (method , body) =>{
    const options = {
        method,
        headers : {"Content-Type" : "application/json"},
    };
    if( body){
        options.body = JSON.stringify(body);
    }
    return options;
};
