import React from 'react';
import style from "../../components/Post/Post.module.scss";
import Image from "next/image";
import cover from "../../assets/logos/cover.jpg";
import {MainLayout} from "../../layouts/main.layout";
import PostComments from "../../components/PostComments/PostComments";
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../../api";
import {CommentType, PostType} from "../../api/types";


interface PostDetailPageProps {
    post: PostType;
}

const PostDetailPage: NextPage<PostDetailPageProps> = ({post}) => {
    return (
        <MainLayout fullWidth={false} commentBar={true}>
            <div style={{cursor: 'auto', borderRadius: 0}} className={style.post}>
                <div className="content">
                    <div className={style.top}>
                        <span className={style.category}>News</span>
                        <span className={style.author}>AndreQ</span>
                        <span className={style.created_at}>{post.createdAt}</span>
                    </div>
                    <h2 className={style.title}>{post.title}</h2>
                    <Image className={style.image} src={cover} alt={''}/>
                    <div className={style.options}>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"/>
                    </div>
                    <div className={style.desc}>
                        {post.body.map(obj => <p dangerouslySetInnerHTML={{__html: obj.data.text}} key={obj.id}/>)}
                    </div>
                </div>
            </div>
            <div className="comments_area">
                <div className="content">
                    <PostComments postId={post.id}/>
                </div>
            </div>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx.params?.id!;
        const post = await Api(ctx).post.getOne(+id);
        return {props: {post}};
    } catch (e) {
        console.log(e);
        return {
            props: {}, redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
};

export default PostDetailPage;