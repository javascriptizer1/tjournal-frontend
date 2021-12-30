import React from 'react';
import style from "./AuthForm.module.scss";
import {Button, Form, Input} from "antd";
import {CreateUserDto} from "../../api/types";
import {userApi} from "../../api/user";
import {useForm, SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {RegisterSchema} from "../../utils/schemas/loginValidation";
import {setCookie} from 'nookies';
import {TextField} from "@material-ui/core";


type RegisterEmailProps = {
    formType: string;
    setFormType: (type: 'register' | 'emailReg' | 'emailLog' | 'login') => void
}

interface IFormInput {
    fullName: string;
    email: string;
    password: string;
}

const RegisterEmail = ({formType, setFormType}: RegisterEmailProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>({
        mode: 'onChange',
        resolver: yupResolver(RegisterSchema)
    });

    const submit:SubmitHandler<IFormInput> = async (dto: CreateUserDto) => {
        try {
            const data = await userApi.register(dto);
            setCookie(null, 'authToken', data.token.access_token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
        } catch (e) {
            console.log('Ошибка при регистрации: ', e)
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className={style.form}>
            <h1>Регистрация</h1>
                <TextField
                    {...register("fullName")}
                    className={style.label}
                    placeholder="Имя и фамилия"
                    helperText={errors.fullName?.message}
                    variant={'outlined'}
                    fullWidth
                />

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

            <Button htmlType={'submit'} className={style.btn}>Зарегистрироваться</Button>

            <p>Есть аккаунт? <span onClick={() => setFormType('login')}>Войти</span></p>
        </form>
    );
};

export default RegisterEmail;