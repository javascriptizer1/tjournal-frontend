import React from 'react';
import style from "./AuthForm.module.scss";
import {LeftOutlined} from "@ant-design/icons";


type EnterFormProps = {
    formType: string;
    setFormType: (type: 'register' | 'emailReg' | 'emailLog' | 'login') => void;
    title: string;
    isRegForm: boolean;
    emailRegOrLog: 'emailReg' | 'emailLog';
}

const EnterForm = ({formType, setFormType, isRegForm, title, emailRegOrLog}: EnterFormProps) => {
    return (
        <div className={style.form}>
            <h1>{title}</h1>
            <div onClick={() => setFormType(emailRegOrLog)} className={style.social}>
                <i className="fa fa-envelope-o" aria-hidden="true"/>
                <span>Почта</span>
            </div>
            <div className={style.social}>
                <i className="fa fa-envelope-o" aria-hidden="true"/>
                <span>Вконтакте</span>
            </div>
            <div className={style.social}>
                <i className="fa fa-envelope-o" aria-hidden="true"/>
                <span>Google</span>
            </div>
            <div className={style.other_social}>
                <div className={style.fb + " mini-social"}/>
                <div className={style.twitter + " mini-social"}/>
                <div className={style.apple + " mini-social"}/>
            </div>

            {isRegForm && <p>Есть аккаунт? <span onClick={() => setFormType('login')}>Войти</span></p>}
        </div>
    );
};

export default EnterForm;