import React from "react";
import {connect} from "react-redux";
import preloader from "../../imgs/rings.svg";

const Preloader = (props) =>{
    return <div>
        <img src={preloader} alt={'loading...'} title={props.comment} style={{width: 150+'px'}} />
    </div>
}
/*
class Preloader extends React.Component{
    render(){
        return <div>
            <img src={preloader} alt={'loading...'} style={{width: 150+'px'}} />
        </div>
    }
}*/

export default connect()(Preloader)