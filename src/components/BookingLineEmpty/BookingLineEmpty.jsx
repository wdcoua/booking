import {React,useEffect,useState} from "react";
// import {Button, Dropdown, Image, Menu, Table, Tag} from "antd";

import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import { ConfigProvider,Calendar } from 'antd';
import 'antd/dist/antd.css';
import s from './BookingLineEmpty.module.css'

import uk_UA from 'antd/lib/locale-provider/uk_UA';
import { getBooking,setSelectedDate,getSelectedDateBooking } from "../../redux/booking_reducer.ts";

import moment from 'moment';
// import 'moment/locale/uk';
// moment.locale('uk');



const BookingLineEmpty = (props) => {

    // let t = new Date(props.line.datetime *1000);
    // console.log(props.settings.startTime)

    let navigate = useNavigate();

    const bookNow = () => {
      navigate('/add_booking/'+props.book.selectedDate+'/'+props.hour)
    }

    return (<div key={props.hour} className={s.line} onClick={bookNow}>
    {props.hour+':00 - book now'}
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

export default compose(connect(mstp,{getBooking,setSelectedDate,getSelectedDateBooking}))(BookingLineEmpty);
