import { Link } from "react-router-dom";

export function ButtonAdd(props){

    return(
    <Link 
     className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300
     font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600
     dark:hover:bg-orange-700 dark:focus:ring-orange-800" {...props}> 
        
    </Link>


    );
}