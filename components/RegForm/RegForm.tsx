import React from 'react';
import style from './RegForm.module.scss';

const RegForm = () => {
    return (
            <div className={style.blur_bg}>
                <div className={style.popup}>
                    <div className={style.left}/>
                    <div className={style.right}>
                        <button className={style.close}>&#215;</button>
                        <div className={style.form}>
                            <h1>Регистрация</h1>
                            <div className={style.social}>
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
                            <p>Есть аккаунт? <span>Войти</span></p>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default RegForm;