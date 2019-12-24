const initialState={
    searchData:"",
    gridData:true,
    drawerData:true,
    showData:true
}

export function reducer(state=initialState,action){
    // const newState={...state};

    console.log("In reducer");

    // if(action.type==="SEARCH_VALUE"){
    //     console.log("Okay");
        
    // }
    //  else
    //  {
    //      console.log("Not okay");
         
    //  }
    
    switch(action.type){
        case "SEARCH_VALUE":{
            // return newState.searchData=action.value;
            return{
                ...state,
                searchData:action.value
            }
        }

        case "VIEW_STATUS":{
            // return newState.gridData=action.value;
            return{
                ...state,
                gridData:action.value
            }
        }

        case "DRAWER_STATUS":{
            // return newState.drawerData=action.value;
            return{
                ...state,
                drawerData:action.value
            }
        }

        case "SHOW_STATUS":{
            // return newState.drawerData=action.value;
            return{
                ...state,
                showData:action.value
            }
        }

        default:return state;
    }
}




