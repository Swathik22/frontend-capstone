export const getStatus=async ()=>{
    const res = await fetch("http://localhost:8088/statuses")
    return await res.json()
}

export const getPriorities=async ()=>{
    const res = await fetch("http://localhost:8088/priorities")
    return await res.json()
}