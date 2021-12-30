import React, {useState} from 'react';
import {Button, Input, Modal} from "antd";
import style from "./AuthForm.module.scss";
import EnterForm from "./EnterForm";
import RegisterEmail from "./RegisterEmail";
import LoginEmail from "./LoginEmail";
import {LeftOutlined} from "@ant-design/icons";

interface LoginFormProps {
    modalVisible: boolean,
    setModalVisible: (isVisible: boolean) => void
}


const AuthForm = ({modalVisible, setModalVisible}: LoginFormProps) => {
    const [formType, setFormType] = useState<'register' | 'emailReg' | 'emailLog' | 'login'>('register');
    return (
        <Modal
            style={{top: 20}}
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={false}
            width={640}
            bodyStyle={{height: '600px', padding: 0, borderRadius: '16px'}}
        >
            <div className={style.popup}>
                <div className={style.left}/>
                <div className={style.right}>

                    {formType === 'register' &&
                    <EnterForm title={'Регистрация'} emailRegOrLog={'emailReg'} isRegForm={true} formType={formType}
                               setFormType={setFormType}/>}

                    {formType === 'emailReg' &&
                    <>
                        <RegisterEmail formType={formType} setFormType={setFormType}/>
                        <span className={style.backArrow} onClick={() => setFormType('register')}><LeftOutlined/> Назад</span>
                    </>}


                    {formType === 'emailLog' && <>
                        <span className={style.backArrow}
                              onClick={() => setFormType('login')}><LeftOutlined/> Назад</span>
                        <LoginEmail formType={formType} setFormType={setFormType}/>
                    </>}

                    {formType === 'login' &&
                    <>
                        <span className={style.backArrow} onClick={() => setFormType('register')}><LeftOutlined/> Назад</span>
                        <EnterForm title={'Войти в систему'} emailRegOrLog={'emailLog'} isRegForm={false}
                                   formType={formType}
                                   setFormType={setFormType}/>
                    </>}
                </div>
            </div>
        </Modal>
    );
};

export default AuthForm;