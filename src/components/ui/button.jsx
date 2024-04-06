
import { Link } from "react-router-dom";

export function Button(props){

    return(
    <Link
    
    className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    {...props}
    >
        
    </Link>

    );
}