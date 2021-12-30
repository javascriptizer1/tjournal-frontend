import React, {useEffect, useState} from 'react';
import { Menu, Dropdown } from 'antd';
import Link from 'next/link';

import style from './Header.module.scss';

import logo from '../../../assets/logos/mail.png';
import {GithubOutlined, MenuOutlined, UserOutlined} from "@ant-design/icons";
import AuthForm from "../../../components/AuthForm/AuthForm";
import {useAppSelector} from "../../../store/hooks";
import {selectUserData} from "../../../store/slices/user";
import {Avatar} from "antd";
import {PostType} from "../../../api/types";
import {Api} from "../../../api";


const Header = () => {
    const user = useAppSelector(selectUserData);
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [foundPosts, setFoundPosts] = useState<PostType[]>([]);
    const [value, setValue] = useState('');

    const onSearchHandle = async (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(e.target.value)
        try {
            const {posts} = await Api().post.search(String(value));
            setFoundPosts(posts);
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        if (modalVisible && user) setModalVisible(false);
    }, [modalVisible, user])

    return (
        <header className={style.header}>
            <div className={style.left}>
                <MenuOutlined className={style.toggle} onClick={() => setOpen(!open)}/>
                <GithubOutlined className={style.logo}/>
                <div className={style.search_input}>
                    <i className={style.search_logo + " fa fa-search"} aria-hidden="true"/>
                    <input placeholder={'Поиск'} value={value} onChange={onSearchHandle} type="text"/>
                </div>
                {foundPosts.length > 0 && (
                    <Menu style={{position: 'fixed', width: 200, top: 50, left: 120, zIndex: 10000}}>
                        {foundPosts.map(p => (
                            <Menu.Item key={p.id}>
                                <a href={`/posts/${p.id}`}>{p.title}</a>
                            </Menu.Item>
                        ))}
                    </Menu>
                )}
                <Link href={'/write'}>
                    <div className={style.new_post}>Новая запись</div>
                </Link>
            </div>
            <div className={style.right}>
                <i className="fa fa-bell-o" style={{fontSize: 24, cursor: 'pointer'}} aria-hidden="true"/>
                {user
                    ? <Avatar shape="square" size={34} icon={<UserOutlined/>}/>
                    : <div className={style.login_btn} onClick={() => setModalVisible(true)}>
                        <i className={style.login_user_logo + " fa fa-user-o"} aria-hidden="true"/>
                        <p>Войти</p>
                    </div>
                }
                <AuthForm setModalVisible={setModalVisible} modalVisible={modalVisible}/>
            </div>
        </header>
    );
};

export default Header;