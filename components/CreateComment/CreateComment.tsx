import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Input} from 'antd';

const {TextArea} = Input;

import style from './CreateComment.module.scss';
import {Api} from "../../api";
import {selectUserData} from "../../store/slices/user";
import {useAppSelector} from "../../store/hooks";

type CreateCommentProps = {
    postId: number;
}

const CreateComment: FC<CreateCommentProps> = ({postId}) => {
    const isAuth = useAppSelector(selectUserData);
    const [isClick, setIsClick] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const submit = async () => {
        try {
            setIsLoading(true);
            const comment = await Api().comment.create({postId, text: value});
            setIsClick(false);
            setValue('');
            setIsLoading(false);
        } catch (e) {
            console.warn(e);
        }
    }

    if (!isAuth) return null;

    return (
        <div style={{marginBottom: '30px'}}>
            <TextArea
                disabled={isLoading}
                className={style.input}
                value={value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
                onClick={() => setIsClick(true)}
                placeholder="Написать комментарий..."
                rows={isClick ? 5 : 1}
                //autoSize={ isClick ? {minRows: 5} : {maxRows: 1}}
            />
            {isClick &&
            <Button disabled={isLoading} onClick={submit} type={'primary'} color={'#4683d9'}>Отправить</Button>}
        </div>
    );
};

export default CreateComment;