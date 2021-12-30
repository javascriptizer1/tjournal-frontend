import type {GetServerSideProps, NextPage} from 'next'
import styles from '../../styles/Home.module.css'
import {MainLayout} from "../../layouts/main.layout";
import CreatePostInputs from "../../components/CreatePostInputs/CreatePostInputs";
import {Api} from "../../api";
import {PostType} from "../../api/types";


interface PostEditPageProps {
    data: PostType;
}

const PostEditPage: NextPage<PostEditPageProps> = ({data}) => {
    return (
        <MainLayout fullWidth={true} commentBar={false}>
            <CreatePostInputs data={data}/>
        </MainLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx.params?.id!;
        const post = await Api(ctx).post.getOne(+id);
        const user = await Api(ctx).user.me();

        if (post.user.id !== user.id) {
            return {
                props: {post},
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        return {props: {data: post}};
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

export default PostEditPage;
