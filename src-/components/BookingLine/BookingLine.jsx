import {React,useEffect,useState} from "react";
// import {Button, Dropdown, Image, Menu, Table, Tag} from "antd";

import {compose} from "redux";
import {connect} from "react-redux";
import { ConfigProvider,Calendar } from 'antd';
import 'antd/dist/antd.css';
import s from './BookingLine.module.css'

import uk_UA from 'antd/lib/locale-provider/uk_UA';
import { getBooking,setSelectedDate,getSelectedDateBooking } from "../../redux/booking_reducer.ts";

import moment from 'moment';
// import 'moment/locale/uk';
// moment.locale('uk');



const BookingLine = (props) => {

    let t = new Date(props.line.datetime *1000);

    // console.log(t.getHours(), t.getTimezoneOffset()/60)

    return (<div key={props.line.id} className={s.line}>
    {(t.getHours() + t.getTimezoneOffset()/60)}:00 - booked
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

export default compose(connect(mstp,{getBooking,setSelectedDate,getSelectedDateBooking}))(BookingLine);
