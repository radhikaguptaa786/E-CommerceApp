import { useState,useEffect,useContext ,createContext} from "react";
import axios from 'axios';
import { Result } from "antd";
const SearchContext=createContext();

const SearchProvider =({children}) =>{
    const[search,setSearch]=useState({
        keyword:"",
        result:[],
    })

    return (
        <SearchContext.Provider value={[search,setSearch]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook
const useSearch=()=>useContext(SearchContext)

export {useSearch,SearchProvider};
