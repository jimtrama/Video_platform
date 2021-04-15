const User = (state={},action)=>{
    if(action.type=="updateUserState"){
        state=action.payload;
        return state;
    }
    return state;
}
export default User ;