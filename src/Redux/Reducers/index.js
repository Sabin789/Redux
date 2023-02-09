
const initialState={
    favourites:{

       content:[],
    }

   }

   const MainReducer=(state=initialState,action)=>{
    switch(action.type){
        
case"ADD-TO-FAVOURITES":
return{
    ...state,
    favourites:{
        ...state.favourites,
        content:[...state.favourites.content,action.payload]
    }
}


        default: return state
    }
   }

   export default MainReducer