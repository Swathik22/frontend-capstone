export const getStatus=()=>{
    return fetch("http://localhost:8088/statuses").then(res=>res.json())
}

export const getPriorities=()=>{
    return fetch("http://localhost:8088/priorities").then(res=>res.json())
}