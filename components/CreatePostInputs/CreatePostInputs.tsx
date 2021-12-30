import React, {FC, useState} from 'react';
import style from './CreatePostInputs.module.scss';
import Image from "next/image";

import ava from '../../assets/logos/ava.png';
import dynamic from "next/dynamic";
import {Api} from "../../api";
import {PostType} from "../../api/types";
import {useRouter} from "next/router";


// @ts-ignore
const Editor = dynamic(() =>
    import('../Editor').then((mod) => mod.Editor), {ssr: false}
);


interface CreatePostInputsProps {
    data?: PostType;
}

const CreatePostInputs: FC<CreatePostInputsProps> = ({data}) => {

    const router = useRouter();
    const [title, setTitle] = useState(data?.title || '');
    const [body, setBody] = useState(data?.body || []);

    const onAddPost = async () => {
        try {
            if (!data) {
                const post = await Api().post.create({title, body});
                await router.push(`/posts/${post.id}`)
                console.log(post);
            } else {
                await Api().post.update(data.id, {title, body});
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={style.create_area}>
            <div className={style.author}>
                <Image src={ava} width={24} height={24} alt={'Аватар'}/> <span>AndreQ</span>
            </div>
            <div className={style.inputs}>
                <input value={title} onChange={e => setTitle(e.target.value)} className={style.title}
                       placeholder={'Заголовок'} type="text"/>
                <div className={style.body}>
                    <Editor initialBody={data?.body} onChange={arr => setBody(arr)}/>
                </div>
            </div>
            <button onClick={onAddPost} disabled={!title.length || !body.length}
                    className={style.publish_btn}>{data ? 'Редактировать' : 'Опубликовать'}</button>
        </div>
    );
};

export default CreatePostInputs;

//2:19:28