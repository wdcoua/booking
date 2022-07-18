import React, {useState} from "react";
import { reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, checkAuthorization, setCaptchaAnswer, signup} from "../../redux/auth_reducer";
import {NavLink, useNavigate} from "react-router-dom";
import {compose} from "redux";
import {createMyField, Hidden, } from "../common/FormsControls/FormsControls";
import {maxLenCreator, minLenCreator, required} from "../../utils/validate/validator";
import c from "./Signup.module.css"
import {Button, Col, Form, Input, Row} from "antd";
import {HomeOutlined, HomeTwoTone, MailOutlined, PhoneOutlined, UnlockOutlined, UserOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

const SignupContainer = (props) => {

    // useEffect(() => {
    //     let p = this.props;
    //     let s = this.state;
    // },[])


    return <Signup {...props}/>
}

// class LoginContainer extends React.Component { // зробив для тесту, можна і без цього класу
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         let p = this.props;
//         let s = this.state;
//         //debugger
//         // todo не працює при лог-ауті на сайті
//     }
//
//     render() {
//         return <Signup {...this.props}/>
//     }
// }
//

const Signup = (props) => {

    // let {tempCaptcha,setTempCaptcha} = useState('');

    // const [rememberMe,setRM] = useState(true);
    const { t } = useTranslation();
    let navigate = useNavigate();

    const onSubmit = ({login,email,pass,phone,addr}) => { //formData
        //
        if (props.auth.isAuth === false || props.auth.temp === '1') {
            props.signup(login,email, pass,phone,addr)
        } else {
            navigate('/index')
        }
        // console.log('rememberMe')
        // console.log(rememberMe)
    }
    // const onSubmit2 = ({email2,pass2,rememberMe2}) => { //formData
    //     //
    //     // console.log('email = ' + email2)
    //     if (props.auth.isAuth === false) {
    //         props.login(email2, pass2, rememberMe2)
    //     } else {
    //         return <Redirect to={'/index'}/>
    //     }
    //     // console.log(formData)
    // }
    if(props.auth.signup_completed){
        // return <Redirect to='/login/signup_completed'/>
        navigate('/login/signup_completed')
    }else{
        return <div className={c.form_container}>
            <h1 className={c.header}>{t('signup.title')}</h1>
            <SignupReduxForm onSubmit={onSubmit} {...props}  /><br/>
            {/*<LoginReduxForm2 onSubmit={onSubmit2} {...props} />*/}

            {t('signup.if_have_login')} <NavLink to='/login'>{t('signup.log_in')}</NavLink>
        </div>
    }

}
const maxLen50 = maxLenCreator(50);
const maxLen200 = maxLenCreator(200);
const maxLen20 = maxLenCreator(20);
const minLen2 = minLenCreator(2);
const minLen6 = minLenCreator(6);
const minLen9 = minLenCreator(9);
// const minLen9 = minLenCreator(9);
// const numOnly = onlyNumbers();

// main login_form
const SignupForm = ({auth, handleSubmit, error,setCaptchaAnswer,rememberMe,setRM,signup}) => {

    // remember captcha in State for both accounts (to they both could use it while authorizing)
    // const formChanged = (e) => {
    //     if(e.target.name === 'captcha'){
    //         setCaptchaAnswer(e.target.value)
    //     }
    // }
    const { t } = useTranslation();
    let navigate = useNavigate();
    const [loadingButton,setLB] = useState(false)

    const onFinish = async (values) => {
        console.log('Success:', values);
        if (auth.isAuth === false || auth.temp === '1') {
            signup(values['login'],values['email'], values['pass'], values['phone'], values['addr'])
                .then(()=>{
                    setLB(false)
                })
        } else {
            // return <Redirect to={'/index'}/>
            navigate('/index')
            
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setLB(false)
    };

    const buttonClicked = () => {
        setLB(true)
    }

    if (auth.isAuth === false || auth.temp === '1') {

        return <Row >
            <Col className="gutter-row"
                 xs={{ span: 22, offset: 1 }}
                 sm={{ span: 20, offset: 2 }}
                 md={{ span: 16, offset: 4 }}
                 lg={{ span: 12, offset: 6 }}
                 xl={{ span: 8, offset: 8 }}
                 xxl={{ span: 6, offset: 9 }}
            >
                <Form onSubmit={handleSubmit}
                     // onChange={formChanged}

                     name="basic"
                     labelCol={{
                         // span: 8,
                     }}
                     wrapperCol={{
                         // span: 12,
                         // offset: 6
                     }}
                     initialValues={{
                         remember: true,
                     }}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
        >

            {error ? <Form.Item>
                <div className={(!error ? c.noError : '') + ' ' + c.error}>
                    {error}
                </div>
            </Form.Item> : ''}


            <Form.Item
                // label="email"
                name="login"
                rules={[
                    {
                        required: true,
                        message: t('signup.choose_login'),

                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder={t('signup.choose_login')}
                />
            </Form.Item>

            <Form.Item
                // label="email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: t('signup.email'),
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder={t('signup.email')}
                />
            </Form.Item>

            <Form.Item
                name="pass"
                rules={[
                    {
                        required: true,
                        message: t('signup.pass'),
                    },
                ]}
            >
                <Input.Password
                    prefix={<UnlockOutlined/>}
                    placeholder={t('signup.pass')}
                />
            </Form.Item>

            <Form.Item
                name="phone"
                rules={[
                    {
                        // required: true,
                        message: t('signup.phone_mess'),
                    },
                ]}
            >
                <Input
                    prefix={<><PhoneOutlined /> &nbsp; +</>}
                    placeholder={t('signup.phone_place')}
                />
            </Form.Item>

            <Form.Item
                name="addr"
                rules={[
                    {
                        // required: true,
                        message: t('signup.addr_mess'),
                    },
                ]}
            >
                <Input
                    prefix={<HomeOutlined  />}
                    placeholder={t('signup.addr_place')}
                />
            </Form.Item>


            {/*<div className={c.input}>{createMyField('Choose Login (Nick Name)', Input, 'login', [required, maxLen50, minLen2],)}</div>*/}
            {/*<div*/}
            {/*    className={c.input}>{createMyField('Enter E-mail', Input, 'email', [required, maxLen50, minLen6],)}</div>*/}
            {/*<div*/}
            {/*    className={c.input}>{createMyField('Choose Password', Input, 'pass', [required, maxLen50, minLen2],)}</div>*/}
            {/*<div*/}
            {/*    className={c.input}>{createMyField('Enter Phone', Input, 'phone', [required, maxLen20, minLen9],)}</div>*/}
            {/*<div*/}
            {/*    className={c.input}>{createMyField('Enter Address for Delivery', Input, 'addr', [required, maxLen200, minLen9],)}</div>*/}


            {/*<div className={style.captchaDiv + ' ' + (!auth.capthaImg ? style.noCaptcha : '')}>*/}
            {/*    <div>*/}
            {/*        <img alt='captcha' src={auth.capthaImg ? auth.capthaImg : ''}/>*/}
            {/*    </div>*/}
            {/*    {createMyField('enter captcha', Input, 'captcha', (!auth.capthaImg ? [] : [required, maxLen50, minLen2]))}*/}
            {/*</div>*/}

            {/*{createMyField(null, Input, 'rememberMe', [], {type: 'checkbox',checked: rememberMe,onClick:rmClick}, "Remember me")}*/}
            {/*<div>*/}
            {/*    <button>Sign Up</button>*/}
            {/*</div>*/}

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loadingButton} onClick={buttonClicked}>
                    {t('signup.register')}
                </Button>
            </Form.Item>
        </Form>
            </Col>
        </Row>
    } else {
        // return <Redirect to={'/index'}/>
        navigate('/index')
    }


}

// secondary login form for TESTing
// const LoginForm2 = ({auth, handleSubmit, error}) => {
//
//     if (auth.isAuth === false) {
//
//         return <form onSubmit={handleSubmit}>
//
//             <div className={(!error ? style.noError : '') + ' ' + style.error}>
//                 {error}
//             </div>
//             {createMyField(null, Hidden, 'email2', [])}
//             {createMyField(null, Hidden, 'pass2', [])}
//
//             {/*  NO CAPTCHA NEEDED */}
//             {/*<div className={style.captchaDiv + ' ' + (!auth.capthaImg ? style.noCaptcha : '')}>*/}
//             {/*    <div>*/}
//             {/*        <img alt='captcha' src={auth.capthaImg ? auth.capthaImg : ''}/>*/}
//             {/*    </div>*/}
//             {/*    {createMyField('enter captcha', Input, 'captcha2', (!auth.capthaImg ? [] : [required, maxLen50, minLen2]))}*/}
//             {/*</div>*/}
//
//             {createMyField(null, Hidden, 'rememberMe2', [])}
//             <div>
//                 <button>Log in for test</button>
//             </div>
//         </form>
//     } else {
//         return <Redirect to={'/index'}/>
//     }
//
//
// }

const SignupReduxForm = reduxForm({
    form: 'signup'
})(SignupForm)
// const LoginReduxForm2 = reduxForm({
//     form: 'auth2'
// })(LoginForm2)


const mapStateToProps = ({auth}) => {
    //debugger
    return {
        auth: auth,
        // initialValues: {
        //     email2: 'wovo4ka2010@gmail.com',
        //     pass2: '3AtGqkmDkKfmX6J',
        //     // email2: 'free@samuraijs.com',
        //     // pass2: 'free',
        //     rememberMe2: true,
        //
        // },

        //capthaImg: props.capthaImg
    }
};

export default compose(
    connect(mapStateToProps, {signup, checkAuthorization,setCaptchaAnswer}),
)(SignupContainer)

//
// export default () => {
//     return <>
//         <a href={`https://social-network.samuraijs.com/login`} target={`_blank`}>Потрібна авторизація</a>
//     </>
// }