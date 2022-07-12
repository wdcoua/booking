import {React,useEffect,useState} from "react";
// import {Button, Dropdown, Image, Menu, Table, Tag} from "antd";

import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import { ConfigProvider,Calendar } from 'antd';
import 'antd/dist/antd.css';
import s from './DayView.module.css'
import BookingLine from "../BookingLine/BookingLine"
import BookingLineEmpty from "../BookingLineEmpty/BookingLineEmpty"

import uk_UA from 'antd/lib/locale-provider/uk_UA';
import { getBooking,setSelectedDate,getSelectedDateBooking } from "../../redux/booking_reducer.ts";

import moment from 'moment';
// import 'moment/locale/uk';
// moment.locale('uk');




const DayView = (props) => {

  let [tz,setTZ] = useState(null); 

  useEffect(()=>{
    console.log(props)
    // console.log(props.params.selectedDate)
    let sd = (props.selectedDate ? props.selectedDate : null)
    if(moment(sd, "DD.MM.YYYY", true).isValid()){
      props.setSelectedDate(sd);
      props.getSelectedDateBooking();

    }
  },[])
  
  let newArr = [];
  let hours = [];

  if(props.settings.settings.startTime && props.settings.settings.endTime && props.settings.settings.startTime > 0 && props.settings.settings.endTime > 0){
    for (let i = props.settings.settings.startTime; i <= props.settings.settings.endTime; i++){
      hours.push(i);
    }
  }
  


  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  // console.log(hours)

  return (<div >
    <h1 className={s.header}>
      {props.book.selectedDate !== null 
      ? <span onClick={()=>{navigate('/')}} title='change date'>Selected date: {props.book.selectedDate}</span>
      : "No date selected"}
    </h1>
    {props.book.selectedDateBooking && hours.map((hour)=>{
      let filtered = props.book.selectedDateBooking.filter((line)=>{
          let t = new Date(line.datetime *1000);
          // console.log(t.getTimezoneOffset())
          if(tz === null) setTZ(t.getTimezoneOffset()/60)
          return t.getHours()+tz === hour 
      })
      
      if(filtered.length){
        // console.log(filtered)

        return (<BookingLine key={hour+tz} line={filtered[0]}/>)
        // for administrator implement possibility to view details of each booking
        
      }else{
        return (<BookingLineEmpty key={hour} hour={hour}/>) 
      }
    }) }


    {props.book.selectedDateBooking === null && hours.map((hour)=>{
      
        return (<BookingLineEmpty key={hour+tz} hour={hour+tz}/>) 
      
    }) }


    <div onClick={handleClick} className={s.link} >&lt;-- back to main</div>
  </div>);
}



// export default CalendarContainer;


const mstp = (state) => {
  return {
      book: state.book,
      settings: state.settings,
      // cartOpened: state.cart.cartOpened,
      // cartItemsFull: state.cart.cartItemsFull,
      // isAuth: state.auth.isAuth,
      // favs: state.user.favourites_ids
      // items: state.index.itemList
  }

}

export default compose(connect(mstp,{getBooking,setSelectedDate,getSelectedDateBooking}))(DayView);
