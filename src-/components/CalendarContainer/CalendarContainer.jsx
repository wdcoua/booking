import {React,useEffect,useState} from "react";
// import {Button, Dropdown, Image, Menu, Table, Tag} from "antd";

import {compose} from "redux";
import {connect} from "react-redux";
import { ConfigProvider,Calendar } from 'antd';
import {useNavigate} from "react-router-dom";
import 'antd/dist/antd.css';
import s from './CalendarContainer.module.css'

import uk_UA from 'antd/lib/locale-provider/uk_UA';
import { getBooking,setSelectedDateBooking } from "../../redux/booking_reducer.ts";

import moment from 'moment';
import 'moment/locale/uk';
moment.locale('uk');



const CalendarContainer = (props) => {

  let [panelChanged,setPanelChanged] = useState(0);

  let testpc = 0;
  let navigate = useNavigate();


  useEffect(()=>{
    if(props.book === null || props.book.count === -1){
      props.getBooking();
    }
    
  },[props.book])

  useEffect(()=>{
    props.setSelectedDateBooking(null)
  },[])

  function onSelect(value, mode) {
    console.log(value, mode);
    let month = +value.month()+1;
    let link = value.date() + '.' + (month < 10 ? '0'+month : month) + '.' + value.year();
    
    // dances with buben to have possibility to select other months
    if(testpc === 0){
      navigate('/show_day/'+link)
      // document.location = '/show_day/'+link
      console.log('link')

    }
    else{
      // setPanelChanged(0)
      testpc = 0
      console.log('pc-0')
    }
      
  
  }
  
  function onPanelChange(value, mode) {
    // setPanelChanged(1)
    testpc = 1
    console.log('pc-1')
    // console.log(value, mode);
    // let link = value.date() + '.' + (+value.month()+1) + '.' + value.year();
    // document.location = '/show_day/'+link
  
  }
  
  
  // function getListData(value) {
  //   let listData;
  //   switch (value.date()) {
  //     case 8:
  //       listData = [
  //         { class: 'green', active: 1 },
  //       ];
  //       break;
  //     case 10:
  //       listData = [
  //         { class: 'red', active: 0 },
  //       ];
  //       break;
  //     case 15:
  //       listData = [
  //         { class: 'yellow', active: 1 },
  //       ];
  //       break;
  //     default:
  //   }
  //   return listData || [];
  // }
  
  // function disabledDate(value){
  //   console.log(value.date())
  //   let dis = moment().add({days:5})
  //   return (
  //     dis
  //   );
  // }
  
  function disabledDate(current) {
    const now = moment();
  
    let weekend = [6,0];
    return (
      // current && 
      (now.add({days:-1}).endOf('day') > current || current > now.add(2, 'months') || weekend.includes(current.day()))
    );
  }
  
  function dateFullCellRender(value) {
    // console.log(value.month())
    // console.log(value.day())
  
    // query to DB if there are bookings starting from today +60 days
    // return dates and times



  
    let renderDates = (props.book !== null && props.book.count !== -1) ? props.book.allBooking : [];
  
    //   let renderDates = [
    //   ['21.04.2022',7],
    //   ['22.04.2022',0],
    //   ['25.04.2022',3],
    //   ['26.04.2022',0],
    //   ['27.04.2022',0],
    //   ['28.04.2022',2],
    //   ['29.04.2022',1],
    //   ['2.05.2022',0],
    //   ['3.05.2022',0],
    //   ['4.05.2022',0],
    //   ['5.05.2022',7],
    //   ['6.05.2022',7],
    //   ['9.05.2022',0],
    //   ['10.05.2022',7],
    //   ['11.05.2022',1],
    //   ['12.05.2022',1],
    //   ['13.05.2022',0],
    //   ['16.05.2022',0],
    //   ['17.05.2022',0],
    //   ['18.05.2022',0],
    //   ['19.05.2022',0],
    //   ['20.05.2022',0],
    //   ['23.05.2022',0],
    //   ['24.05.2022',1]
      
    // ];
    let maxBook = 7; // in settings
    let color = null;
    let comment = '';
    let weekend = [6,0];
    // if(weekend.includes(value.day())){
    //   color = 'grey'
    // }else
    if(!!renderDates){
      renderDates.map((d)=>{
      let d1 = moment(d[0], "DD.MM.YYYY")
      let d2 = moment(value)
      if(d2.date() === d1.date() && d2.month() === d1.month() && d2.year() === d1.year() ){
        
        if(d[1] >= maxBook){
          color = 'red'
          comment = 'no free places for booking'
        }else
        if(d[1] > 0 && d[1] < maxBook){
          color = 'yellow'
          comment = maxBook-d[1]+' free places for booking'
        }else
        if(d[1] <= 0){
          color = 'green'
          comment = 'all ' + maxBook + ' places are free for booking'
        }
        
      }
      // console.log(color, d[1])
      return color, comment;
    })
    }
    
    // let d = new Date();
    // let weekend = [6,0];
    // let restDays = [7,8,9,15,22,25];
    // let greenDays = [26,29];
    // let blueDays = [27];
    // let yellowDays = [21];
    // if(value.month() === d.getMonth()){
    //   if(weekend.includes(value.day())){
    //     color = 'grey'
    //   }else
    //   if(restDays.includes(value.date())){
    //     color = 'red'
    //   }else
    //   if(greenDays.includes(value.date())){
    //     color = 'green'
    //   }else
    //   if(yellowDays.includes(value.date())){
    //     color = 'yellow'
    //   }else
    //   if(blueDays.includes(value.date())){
    //     color = 'blue'
    //   }
    // }
    // console.log(color)
    // const listData = getListData(value);
    // let link = value.date() + '.' + (value.add(1,'month').month()) + '.' + value.year()
    // {'/show_day/'+link}
    let now = moment();
    if(value >= now && value < now.add(60,'days')){
      comment = !weekend.includes(value.day()) ? (comment !== '' ? comment : 'all ' + maxBook + ' places are free for booking') : '';
      color = color === null && !weekend.includes(value.day()) ? 'green' : color;
    }
    

    return (
      <span title={comment} className={
        color === 'grey' ? s.day_grey :
        color === 'red' ? s.day_red :
        color === 'green' ? s.day_green :
        color === 'yellow' ? s.day_yellow :
        color === 'blue' ? s.day_blue : null
      } >{value.date()}</span>
    );
  }





    return (<div className={s.main}>
      <h1>Бронювання</h1>
    <div>Для початку обери вільну дату:</div>
    
    <div className={s.site_calendar_demo_card}>
    <ConfigProvider locale={uk_UA}>
      <Calendar 
      fullscreen={false} 
      onPanelChange={onPanelChange} 
      onSelect={onSelect}
      dateFullCellRender={dateFullCellRender}
      disabledDate={disabledDate} />
    </ConfigProvider>
  </div>
    </div>);
}



// export default CalendarContainer;


const mstp = (state) => {
  return {
      book: state.book,
      // cartOpened: state.cart.cartOpened,
      // cartItemsFull: state.cart.cartItemsFull,
      // isAuth: state.auth.isAuth,
      // favs: state.user.favourites_ids
      // items: state.index.itemList
  }

}

export default compose(connect(mstp,{getBooking,setSelectedDateBooking}))(CalendarContainer);
