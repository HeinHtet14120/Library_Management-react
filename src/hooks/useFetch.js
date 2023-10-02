import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function useFetch(url, method = 'GET'){

    let [data,setData] = useState(null);
    let [loading,setLoading] = useState(false);
    let [error,setError] = useState(null);
    let [postData , setPostData] = useState ('');
    // let navigate = useNavigate();

    useEffect(()=>{

        let abortController = new AbortController();
        let signal = abortController.signal;

        let options = {
            signal,
            method
        };

        setLoading(true);

        let fetchData = () =>{

            fetch(url,options)
                .then(res => {
                    if(! res.ok){
                        throw Error('Something went wrong');
                    }
                    return res.json();
                })
                .then(data => {
                setData(data)
                setLoading(false);
                setError(null)
                })
                .catch(e => {
                    setError(e.message);
                    // if(e){
                    //     navigate("*")
                    // }
                });
        }

        if(method === "POST" && postData){
            options = {
                ...options,
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(postData)
            }

            fetchData();
        }

        if(method === "GET"){
            fetchData();
        }
        

        return() =>{
            abortController.abort();
            console.log(signal)
        }
            
        
          
    },[url,postData]);
    
    
           //key  : value    if key and value has the same name you can put only one name
    return {  setPostData , data , loading : loading, error};
}

export default useFetch;