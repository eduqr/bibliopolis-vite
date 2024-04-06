import { Link } from "react-router-dom";

export function ButtonEdit(props){

    return(
    <Link 
     className="focus:outline-none text-white focus:ring-4 focus:ring-green-300
     font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
     dark:hover:bg-green-700 dark:focus:ring-green-800" {...props}> 
        
    </Link>


    );
}