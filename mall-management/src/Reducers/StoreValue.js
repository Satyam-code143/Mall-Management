const StoreValue=(state='',action)=>{
    switch(action.type){
        case 'Json':
            return state= action.payload
        default: return state 
    }
}

export default StoreValue;