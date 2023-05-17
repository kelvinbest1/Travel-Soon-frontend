import React, {useState, useEffect} from "react";
import campsAPI from "../../services/camps-api";

function SearchPage(props) {
    const [camps, setCamps] = useState([]);

    useEffect(() => {
        campsAPI.getAll().then(res => setCamps(res))
    }, []);
    console.log(camps) 

    return (
        <>
            <h1>Search Camps</h1>
            
        </>
    );
}


export default SearchPage;