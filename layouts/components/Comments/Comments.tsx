import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import style from './comments.module.scss';

import ava from '../../../assets/logos/ava.png';
import {CommentType} from "../../../api/types";
import {Api} from "../../../api";

type Comment = {
    ava: any;
    author: string;
    text: string;
    tags: string;
}

const Comments = () => {

    const [comments, setComments] = useState<CommentType[]>([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Api().comment.getAll();
                setComments(response);
            } catch (e) {
                console.log(e)
            }
        }

        fetchData()
    }, []);


    return (
        <div className={style.comments}>
            {comments.map(comment => <div key={comment.id} className={style.comment}>
                <div className={style.author}>
                    <Image src={ava} width={24} height={24} alt={'Аватар'}/> <span>{comment.user.fullName}</span>
                </div>
                <div className={style.text}>{comment.text}</div>
                <div className={style.tags}>{comment.post.title}</div>
            </div>)}
        </div>
    );
};

export default Comments;

//1:41:14