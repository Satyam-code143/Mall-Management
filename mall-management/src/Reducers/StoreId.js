const StoreId=(state='',action)=>{
    switch(action.type){
        case 'Id':
            return state= action.payload
        default: return state 
    }
}

export default StoreId;