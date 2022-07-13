import React, {useState} from "react";
import { reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, checkAuthorization, setCaptchaAnswer} from "../../redux/auth_reducer";
import {useNavigate,NavLink} from "react-router-dom";
import {compose} from "redux";
import {createMyField, Hidden, } from "../common/FormsControls/FormsControls";
import {maxLenCreator, minLenCreator, required} from "../../utils/validate/validator";
import c from "./Login.module.css"
import {Button, DatePicker, Form, Checkbox, Row, Col} from "antd";
// import "antd/dist/antd.css";
import { Input, Tooltip } from 'antd';
import {InfoCircleOutlined, KeyOutlined, UnlockOutlined, UserOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";

const LoginContainer = (props) => {

    // useEffect(() => {
    //     let p = this.props;
    //     let s = this.state;
    // },[])


    return <Login {...props}/>
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
//         return <Login {...this.props}/>
//     }
// }

const Login = (props) => {
    // signup_completed
    // console.log('props')
    // console.log(props)
    // let {tempCaptcha,setTempCaptcha} = useState('');


    const { t } = useTranslation();
    let navigate = useNavigate();

    const [rememberMe,setRM] = useState(true);

    const onSubmit = ({email,pass}) => { //formData
        //
        if (props.auth.isAuth === false || props.auth.temp === '1') {
            props.login(email, pass, rememberMe)
        } else {
            // return <Redirect to={'/index'}/>
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
    return <div className={c.form_container}>
        <h1>{t('auth.title')}</h1>
        {/* {(props.match.params.sc && props.match.params.sc === 'signup_completed')
            ? <div className={c.sc}>{t('auth.signup_completed')} <br/><br/></div>
            : ''
        } */}
        <LoginReduxForm onSubmit={onSubmit} {...props} rememberMe={rememberMe} setRM={setRM} /><br/>
        {/*<LoginReduxForm2 onSubmit={onSubmit2} {...props} />*/}
        {t('auth.if_no_login')} <NavLink to='/signup'>{t('auth.register')}</NavLink>
    </div>
}
const maxLen50 = maxLenCreator(50);
const minLen2 = minLenCreator(2);
// const numOnly = onlyNumbers();

// main login_form
const LoginForm = ({auth, handleSubmit, error,setCaptchaAnswer,rememberMe,setRM,login}) => {

    // remember captcha in State for both accounts (to they both could use it while authorizing)
    // const formChanged = (e) => {
    //     if(e.target.name === 'captcha'){
    //         setCaptchaAnswer(e.target.value)
    //     }
    // }

    const { t } = useTranslation();
    const [loadingButton,setLB] = useState(false)
    let navigate = useNavigate();

    const rmClick = (e) => {
        // console.log(e.target.checked);
        // setRM(e.target.checked);
    }

    const onFinish = async (values) => {
        let rm = values['rememberMe'] === undefined ? false : values['rememberMe'];
        console.log('Success:', values,rm);
        if (auth.isAuth === false || auth.temp === '1') {
            login(values['email'], values['pass'], rm)
                .then(()=>{
                    setLB(false)
                })
        } else {
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
    const style = { background: '#0092ff', padding: '8px 0' };

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
                {/*<div style={style}>col-6</div>*/}
                <Form onSubmit={handleSubmit}
                    // onChange={formChanged}

                      name="basic"
                      labelCol={{
                          // span: 8,
                      }}
                      // wrapperCol={{
                      //     span: 12,
                      //     offset: 6
                      // }}
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
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: t('auth.email_mess'),
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder={t('auth.email_place')}
                            // suffix={<Tooltip title="Extra information">
                            //     <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            // </Tooltip>}

                        />
                        {/*{createMyField('login/email', Input, 'email', [required, maxLen50, minLen2],{
                prefix:<UserOutlined className="site-form-item-icon" />,suffix:
                    <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
            })}*/}
                    </Form.Item>


                    {/*<br/>*/}

                    <Form.Item
                        // label="Password"
                        name="pass"
                        rules={[
                            {
                                required: true,
                                message: t('auth.pass_mess'),
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<UnlockOutlined/>}
                            placeholder={t('auth.pass_place')}
                        />
                    </Form.Item>

                    {/*{createMyField('pass', Input.Password, 'pass', [required, maxLen50, minLen2], )}*/}
                    {/*<br/>*/}


                    {/*<div className={c.captchaDiv + ' ' + (!auth.capthaImg ? c.noCaptcha : '')}>*/}
                    {/*    <div>*/}
                    {/*        <img alt='captcha' src={auth.capthaImg ? auth.capthaImg : ''}/>*/}
                    {/*    </div>*/}
                    {/*    {createMyField('enter captcha', Input, 'captcha', (!auth.capthaImg ? [] : [required, maxLen50, minLen2]))}*/}
                    {/*</div>*/}

                    {/*{createMyField(null, Input, 'rememberMe', [], {type: 'checkbox',checked: rememberMe,onClick:rmClick}, "Remember me")}*/}
                    {/*<div>*/}

                    <Form.Item name="rememberMe" valuePropName="checked" >
                        <Checkbox>{t('auth.remember_me')}</Checkbox>
                    </Form.Item>

                    {/*<Button  type="primary" onClick={handleSubmit}>Log in</Button>*/}


                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loadingButton} onClick={buttonClicked}>
                            {t('auth.log_in')}
                        </Button>
                    </Form.Item>


                    {/*<Button  type="primary" loading>Log in</Button>*/}
                    {/*</div>*/}
                </Form>
            </Col>

        </Row>

    } else {
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
//             <div className={(!error ? c.noError : '') + ' ' + c.error}>
//                 {error}
//             </div>
//             {createMyField(null, Hidden, 'email2', [])}
//             {createMyField(null, Hidden, 'pass2', [])}
//
//             {/*  NO CAPTCHA NEEDED */}
//             {/*<div className={c.captchaDiv + ' ' + (!auth.capthaImg ? c.noCaptcha : '')}>*/}
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

const LoginReduxForm = reduxForm({
    form: 'auth'
})(LoginForm)
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
    connect(mapStateToProps, {login, checkAuthorization,setCaptchaAnswer}),
)(LoginContainer)

//
// export default () => {
//     return <>
//         <a href={`https://social-network.samuraijs.com/login`} target={`_blank`}>Потрібна авторизація</a>
//     </>
// }