import React, {FC} from 'react';
import Image from "next/image";
import moment from 'moment';

import style from './Post.module.scss';

import cover from '../../assets/logos/cover.jpg';
import Link from 'next/link';
import {Tooltip} from "antd";

interface PostProps {
    id: number;
    title: string;
    description: string;
    createdAt: string

}

const Post: FC<PostProps> = ({id, title, description, createdAt}) => {
    return (
        <Link href={{
            pathname: '/posts/[id]',
            query: {id},
        }} passHref>
            <a>
                <div className={style.post}>
                    <div className={style.top}>
                        <span className={style.category}>News</span>
                        <span className={style.author}>AndreQ</span>
                        <span className={style.created_at}>
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(createdAt).fromNow()}</span>
                            </Tooltip>
                        </span>
                    </div>
                    <h2 className={style.title}>{title}</h2>
                    {description}
                    <Image className={style.image} src={cover} alt={''}/>
                    <div className={style.options}>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                    </div>
                </div>
            </a>
        </Link>

    );
};

export default Post;