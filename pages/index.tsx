import type {GetServerSideProps, NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {MainLayout} from "../layouts/main.layout";
import Post from "../components/Post/Post";
import {Api} from "../api";
import {PostType} from "../api/types";


interface HomeProps {
    posts: PostType[],
}

const Home: NextPage<HomeProps> = ({posts}) => {
    return (
        <>
            <MainLayout fullWidth={false} commentBar={true}>
                <div className="posts">
                    {posts.map(post => <Post key={post.id} id={post.id} createdAt={post.createdAt} title={post.title}
                                             description={post.description}/>)}
                </div>
            </MainLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const posts = await Api().post.getAll();
        return {props: {posts}}
    } catch (e) {
        console.log(e);
    }
    return {
        props: {posts: null}
    }
};

export default Home
