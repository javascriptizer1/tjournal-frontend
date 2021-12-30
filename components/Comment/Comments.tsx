import React, {createElement, FC, useState} from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import {CommentType} from "../../api/types";


type CommentProps = {
    comment: CommentType;
}

const CommentComp: FC<CommentProps> = ({comment}) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState<string>();

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
        <Comment
            actions={actions}
            author={<a>{comment.user.fullName}</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <p>
                    {comment.text}
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(comment.createdAt).fromNow()}</span>
                </Tooltip>
            }
        />
    );
};

export default CommentComp;

//40:09
