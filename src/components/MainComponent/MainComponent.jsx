import React from "react";

import {Navigate, Route, Routes} from "react-router-dom";
import { useMatch } from "react-router-dom";

import {
    BrowserRouter,
    Link,
    Outlet,
  } from "react-router-dom";


import {withSuspenseWrapper} from "../hoc/withSuspenseWrapper/withSuspenseWrapper";
import CalendarContainer from "../CalendarContainer/CalendarContainer";
import DayView from "../DayView/DayView";
import AddBooking from "../AddBooking/AddBooking";
import Login from "../Login/Login";
import BookingLineEmpty from "../BookingLineEmpty/BookingLineEmpty";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import s from './MainComponent.module.css'
import i18n from "i18next";


const MainComponent = () => {

  i18n.changeLanguage('ua')

  let match = useMatch("/show_day/:selectedDate");
  let match2 = useMatch("/add_booking/:selectedDate/:selectedHour");
    console.log(match)

    // need to reconfigure here
    // https://github.com/remix-run/react-router/blob/main/docs/upgrading/v5.md


    // let auth = {
    //   isAuth: false
    // }

    return (
          <Routes>
            <Route path="add_booking/:selectedDate/:selectedHour" 
            element={<AddBooking 
            selectedDate={match2 && match2.params.selectedDate} 
            selectedHour={match2 && match2.params.selectedHour}  />} />

            <Route path="show_day/:selectedDate" element={<DayView selectedDate={match && match.params.selectedDate} />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/admin" element={<AdminContainer />} /> */}
            <Route path="/" element={<CalendarContainer />} />
              {/* <Route path="me" element={<OwnUserProfile />} />
              <Route path=":id" element={<UserProfile />} /> */}
            {/* </Route> */}
          </Routes>
      );

    // return (
    // <div className={s.mainpart}>
    // <Header />
    // {   match !== null 
    //     ? <DayView selectedDate={match.params.selectedDate} />
    //     : <CalendarContainer/>
    // }
    //         {/* <Routes> */}
    //             {/* <Route exact path='/' element={<CalendarContainer/>}/> */}
    //             {/*<Route exact path='/' render={() => ( <ExamplesContainer/> )}/>*/}
    //             {/* <Route exact path='/index' render={() => (<Navigate to={'/'}/>)}/> */}
    //             {/*<Route path='/index' render={() => (<ExamplesContainer/>)}/>*/}
    //             {/* <Route path='/adminko' element={<>test</>}/>  */}
    //             {/* <Route path='/show_day/:selectedDate' render={(props)=>(<DayView/>)}/> */}
    //         {/* </Routes> */}
    // <Footer />
    // {/* <CalendarContainer />  */}
    // </div>);
}

export default MainComponent;
