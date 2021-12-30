import type {GetServerSideProps, NextPage} from 'next'
import styles from '../../styles/Home.module.css'
import {MainLayout} from "../../layouts/main.layout";
import CreatePostInputs from "../../components/CreatePostInputs/CreatePostInputs";
import {Api} from "../../api";

const NewPostPage: NextPage = () => {
    return (
        <MainLayout fullWidth={true} commentBar={false}>
            <CreatePostInputs/>
        </MainLayout>
    )
};


export default NewPostPage;
