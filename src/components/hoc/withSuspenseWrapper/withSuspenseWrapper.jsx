import React,{Suspense} from "react";
import Preloader from "../../Preloader/Preloader";

export const withSuspenseWrapper = (Component) => {
    return (props) => {
        return <Suspense fallback={<Preloader  comment='loading 7'/>}>
            <Component {...props} />
        </Suspense>;
    }
}
