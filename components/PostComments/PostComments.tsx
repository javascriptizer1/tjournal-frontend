import React, {FC, useEffect, useState} from 'react';
import style from './PostComments.module.scss';
import CreateComment from "../CreateComment/CreateComment";
import TabsComp from "../Tabs/Tabs";
import CommentComp from "../Comment/Comments";
import {Api} from "../../api";
import {CommentType} from "../../api/types";

type PostCommentsProps = {
    postId: number;
}

const PostComments: FC<PostCommentsProps> = ({postId}) => {
    const [activeTab, setActiveTab] = useState("1");
    const [comments, setComments] = useState<CommentType[]>([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Api().comment.getAll(postId);
                setComments(response);
            } catch (e) {
                console.log(e)
            }
        }

        fetchData()
    }, [comments]);

    return (
        <div>
            <h1 style={{marginBottom: '20px'}}> {comments.length} комментариев</h1>
            <TabsComp activeTab={activeTab} setActiveTab={setActiveTab}/>
            <hr/>
            <CreateComment postId={postId}/>
            {activeTab == '1' && <>
                {comments.map(comment => <CommentComp key={comment.id} comment={comment}/>)}
            </>}
            {activeTab == '2' && <>
                {comments.map(comment => <CommentComp key={comment.id} comment={comment}/>)}
            </>}
        </div>
    );
};


export default PostComments;