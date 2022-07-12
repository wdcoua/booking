import React,{useEffect,useState} from "react";
// import {Button, Dropdown, Image, Menu, Table, Tag} from "antd";

import {compose} from "redux";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CheckBox, createMyField, FileUpload, Input, Textarea} from "../common/FormsControls/FormsControls";
// import {reduxForm} from "redux-form";
import {Form, Field} from "react-final-form";
// import {required} from "../../utils/validate/validator";
import { ConfigProvider,Calendar } from 'antd';
import 'antd/dist/antd.css';
import s from './AddBooking.module.css'
import BookingLine from "../BookingLine/BookingLine"
import BookingLineEmpty from "../BookingLineEmpty/BookingLineEmpty"

import uk_UA from 'antd/lib/locale-provider/uk_UA';
import { uploadBooking,setSelectedDate,getSelectedDateBooking,setServerAnswer } from "../../redux/booking_reducer.ts";

import moment from 'moment';
// import 'moment/locale/uk';
// moment.locale('uk');
//


const AddBookingForm = (props) => {

  // useEffect(()=>{
  //   console.log(props)
  //   // console.log(props.params.selectedDate)
  //   let sd = (props.selectedDate ? props.selectedDate : null)
  //   if(moment(sd, "DD.MM.YYYY", true).isValid()){
  //     props.setSelectedDate(sd);
  //     props.getSelectedDateBooking();
  //   }
  // },[])
  
  // let newArr = [];
  // let hours = [];

  // if(props.settings.startTime && props.settings.endTime && props.settings.startTime > 0 && props.settings.endTime > 0){
  //   for (let i = props.settings.startTime; i <= props.settings.endTime; i++){
  //     hours.push(i);
  //   }
  // }
  


  // let navigate = useNavigate();
  // function handleClick() {
  //   navigate("/");
  // }

  // // console.log(hours)

  // return (<div >
  //   {props.selectedDate + ' - ' + props.selectedHour}

  //   <div onClick={handleClick} className={s.link} >&lt;-- back to main</div>
  // </div>);
  
  // const handleSubmit = () => {
  //   console.log('submited')
  // }
    
  let navigate = useNavigate();
  // function handleClick() {
  //   ;
  // }
  const parsePhoneNumber = (number) => {
    return number.replaceAll(/[^0-9]*/g,'')
  }

  let [bookingAdded,setBA] = useState(false)

  useEffect(()=>{
    if(bookingAdded && props.book.serverAnswer !== null && props.book.serverAnswer.adding === 'ok'){
      console.log('added - redirect!')
      navigate("/show_day/"+props.selectedDate)
    }
  },[bookingAdded,props.book.serverAnswer!== null ? props.book.serverAnswer : null])

  return <div className={s.wrapper}>
    <Form
        // initialValues={{name:'fdr'}}
        // onSubmit={handleSubmit}
        initialValues={{
          // firstName: 'Dan'
        }}
        onSubmit={values => {
          // send values to the cloud
          console.log(values)
          let out = {
            'name': values.name,
            'phone': values.phone,
            'car_model': values.car_model,
            'car_number': values.car_number,
            'email': values.email ? values.email : '',
            'comment': values.comment ? values.comment : '',
            'selectedDate': props.selectedDate + ' ' + props.selectedHour + ':00',
        }
          console.log(out)
          props.setServerAnswer(null)
          props.uploadBooking(out)
          setBA(true)

        }}
        
        validate={values => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          if (!values.phone) {
            errors.phone = 'Required'
          }
          else if(parsePhoneNumber(values.phone).length < 9){
            errors.phone = '9 numbers minimum'
            // console.log(parsePhoneNumber(values.phone).length)
          }
          
          // if (values.phone.parseInt().length < 9 ) {
          //   errors.car_number = '9 numbers minimum'
          // } 
          

          if (!values.car_model) {
            errors.car_model = 'Required'
          }
          if (!values.car_number) {
            errors.car_number = 'Required'
          }
          return errors
       }}

        >
    {({ handleSubmit, pristine, form, submitting })=>(
      <form  
      id='addBookingForm' 
      onSubmit={handleSubmit}
      >
        <div className={s.wrap_button}>
          <button className={s.addButton} type='submit'>Add</button>
        </div>
        
        

  Selected date:
  {createMyField('date',Input,'date',{initialValue:props.selectedDate,onClick:()=>{navigate("/")}, title: 'change date'})}<br/>
  Selected time:
  {createMyField('time',Input,'time',{initialValue:props.selectedHour+':00',onClick:()=>{navigate("/show_day/"+props.selectedDate)}, title: 'change time'})}<br/>

  Your name:
  {createMyField('Your name',Input,'name',[])}<br/>
  Your e-mail:
  {createMyField('Your e-mail',Input,'email',[])}<br/>
  Your phone:
  {createMyField('Your phone',Input,'phone',[])}<br/>
  Your car model:
  {createMyField('Your car model',Input,'car_model',[])}<br/>
  Your car number:
  {createMyField('Your car number',Input,'car_number',[])}<br/>
  Comment:
  {createMyField('Comment',Textarea,'comment',[],null)}<br/>
  
  {/* {createMyField('Розмір',Input,'size',[],null)}<br/>
  Зріст (в см., через кому, якщо кілька):
  {createMyField('Зріст',Input,'height',[],null)}<br/>
  Вік (роки, тільки число):
  {createMyField('Вік (роки)',Input,'age_y',[],null)}<br/>
  Вік (місяці, тільки число):
  {createMyField('Вік (місяці)',Input,'age_m',[],null)}<br/> */}


  {/* Фото: <br/>
  <input onChange={photoChanged} name='photo' type='file' multiple /><br/><br/>
  {createMyField('Фото',FileUpload,'photo',[], {onChange: photoChanged})} */}
  {/* <fieldset>
      <legend>Категорії:</legend>
  <br/>
  {
      cats.map((cat)=>{
          return <div key={cat.id}>
              {cat.active === '1' && ( cat.name === '***** interval *****' ? <div>&nbsp;</div> :
                  createMyField(null,CheckBox,'cats['+cat.id+']',[],null,cat.name)
              )
              }

          </div>
      })
  }</fieldset> */}
  {/* <fieldset>
      <legend>Знижки</legend>
  Знижка в грошах (тільки число):
  {createMyField('15', Input, 'discount_money', [])}<br/>
  Знижка у відсотках (тільки число):
  {createMyField('5', Input, 'discount_percent', [])}<br/>
  </fieldset> */}


  {/* <fieldset>
      <legend>Стара ціна:</legend>
      {createMyField('Стара ціна (тільки число)',Input,'old_price',[],{onChange:oldPriceChanged})}<br/>

      {createMyField('Активувати стару ціну',CheckBox,'old_price_active',[],{onClick:oldPriceActivatorChanged},'Активувати стару ціну',1)}<br/>
  </fieldset> */}
<br/>


  {/* Порядок (тільки число):
  {createMyField('по-замовчуванню - 10', Input, 'item_order', [])}<br/> */}

        <div className={s.wrap_button}>
          <button className={s.addButton} type='submit'>Add</button>
        </div>
        <div className={s.wrap_button}>
          <button className={s.cancelButton} type='button' onClick={()=>{navigate('/')}}>Cancel</button>
        </div>
</form>
    )}
    
    </Form>
    </div>
}
///
// const AddBookingFormRedux = reduxForm({
// form: 'addBooking'
// })(AddBookingForm);

// const AddBooking = React.memo((props) => {


//   const onSubmit = async (form_data) => {
//     // debugger
//     // let out = {
//     //     'name': formData.name,
//     //     'descr': formData.descr,
//     //     'active': formData.active,
//     //     'count': formData.active,
//     //     'price': formData.active,
//     //     'photo': formData.active,
//     //     'active': formData.active,
//     //     'active': formData.active,
//     //     'active': formData.active,
//     //     'active': formData.active,
//     //     'active': formData.active,
//     //
//     // }

//     let out = new FormData()
//     console.log(form_data)
//     props.uploadBooking(form_data)
//   }

//   return <div>
//     <AddBookingForm
//     // change={change}
    
//     // onSubmit={onSubmit}
//      />
//   </div>
// })

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
//
export default compose(connect(mstp,{uploadBooking,setServerAnswer}))(AddBookingForm);
// export default AddBookingForm;
