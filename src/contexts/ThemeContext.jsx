//theme context

import { createContext, useReducer } from "react";


const ThemeContext = createContext();

//theme context provider components 

let ThemeReducer = (state,action) =>{
    switch (action.type){
        case "CHANGE_THEME":
            return {...state, theme : action.payload};
        default :
            return state;
    }
}

const ThemeContextProvider = ({children}) =>{

    let [state,dispatch] = useReducer(ThemeReducer,{theme : 'light'});

    const isDark = state.theme === 'dark';

    let changeTheme = (theme) =>{
    // action -> type+payload ->{type,payload}
        dispatch({type : "CHANGE_THEME", payload : theme})
    }
    return(
        <>
                                 {/* obj bl lat khan */}
        <ThemeContext.Provider value={{...state,changeTheme, isDark}}>
            {children}
        </ThemeContext.Provider>
        </>  
        
    )
}

export {ThemeContext, ThemeContextProvider}