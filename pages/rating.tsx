import type {GetServerSideProps, NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {MainLayout} from "../layouts/main.layout";
import CreatePostInputs from "../components/CreatePostInputs/CreatePostInputs";
import {Api} from "../api";
import {RequestUserData} from "../api/types";

type RatingProps = {
    users: RequestUserData[];
}

const Rating: NextPage<RatingProps> = ({users}) => {
    return (
        <MainLayout fullWidth={true} commentBar={false}>
            <div>
                {users.map(user => <div
                    key={user.id}>{user.fullName} ||| {user.commentsCount &&
                <span>{user.commentsCount * 32}</span>}</div>)}
            </div>
        </MainLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const users = await Api().user.getAll();
        return {props: {users}}
    } catch (e) {
        console.log(e);
    }
    return {
        props: {users: null}
    }
};


export default Rating;
