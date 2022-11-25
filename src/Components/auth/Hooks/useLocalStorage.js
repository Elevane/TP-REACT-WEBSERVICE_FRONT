


const GetUser = () => {
    const user = localStorage.getItem("user");
    if(user === null)
        return false
    const parsed = JSON.parse(user);
    if(parsed.user === null || parsed.user === undefined)
        return false
    let isUndifiend = parsed.user.username === undefined || parsed.user.token === undefined || parsed.user.id === undefined
    let isNull = parsed.user.username === null || parsed.user.token === null || parsed.user.id === null
    if( isUndifiend && isNull)
       return false
    else return parsed.user
}


export default { GetUser}