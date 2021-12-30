import React from 'react';
import {Button, Input} from "antd";
import {SubmitHandler, useForm} from "react-hook-form";

import style from './AuthForm.module.scss';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {LoginSchema} from "../../utils/schemas/loginValidation";
import {TextField} from "@material-ui/core";
import {CreateUserDto, LoginDto} from "../../api/types";
import {userApi} from "../../api/user";
import {setCookie} from "nookies";
import {useAppDispatch} from "../../store/hooks";
import {setUserData} from "../../store/slices/user";
import {Api} from "../../api";

type LoginEmailProps = {
    formType: string;
    setFormType: (type: 'register' | 'emailReg' | 'emailLog' | 'login') => void
}

interface IFormInput {
    email: string;
    password: string;
}

const LoginEmail = ({formType, setFormType}: LoginEmailProps) => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema)
    });

    const submit:SubmitHandler<IFormInput> = async (dto: LoginDto) => {
        try {
            const data = await Api().user.login(dto);
            console.log(data);
            setCookie(null, 'authToken', data.token.access_token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
            dispatch(setUserData(data))
        } catch (e) {
            console.log('Ошибка при авторизации: ', e)
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className={style.form}>
            <h1>Войти по почте</h1>

            <TextField
                className={style.label}
                {...register("email")}
                type={'email'}
                placeholder="Почта"
                helperText={errors.email?.message}
                variant={'outlined'}
                fullWidth
            />

            <TextField
                className={style.label}
                {...register("password")}
                type={'password'}
                placeholder="Пароль"
                helperText={errors.password?.message}
                variant={'outlined'}
                fullWidth
            />
            <Button htmlType={'submit'} className={style.btn}>Войти</Button>

            <p>Нет аккаунта? <span onClick={() => setFormType('register')}>Зарегистрироваться</span></p>
        </form>
    );
};

export default LoginEmail;

//22:55