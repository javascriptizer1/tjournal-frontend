import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    email: yup.string().email('Неверная почта').required('Это поле обязательно'),
    password: yup.string().min(6, 'Длина пароля должна быть минимум 6 символов!').required('Это поле обязательно'),
});

export const RegisterSchema = yup.object().shape({
    fullName: yup.string().min(2, 'Минимум 2 символа').required('Это поле обязательно'),
}).concat(LoginSchema);