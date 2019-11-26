const initialState={
    searchData:""
}

const reducer=(state=initialState,action)=>{
    const newState={...state};

    switch(action.type){
        case "SEARCH_VALUE":
            return newState.searchData;
            break;
    }
}