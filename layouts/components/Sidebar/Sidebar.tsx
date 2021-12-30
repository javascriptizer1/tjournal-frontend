import Link from 'next/link';
import React from 'react';
import style from './sidebar.module.scss';
import {useRouter} from "next/router";

type Element = {
    name: string;
    icon: string;
    href: string;
}

const Sidebar = () => {

    const router = useRouter();

    const elements: Element[] = [
        {
            name: 'Лента',
            icon: 'fa fa-rss',
            href: '/',
        },
        {
            name: 'Сообщения',
            icon: 'fa fa-commenting-o',
            href: '/messages',
        },
        {
            name: 'Рейтинг',
            icon: 'fa fa-star-o',
            href: '/rating',
        },
        {
            name: 'Подписки',
            icon: 'fa fa-globe',
            href: '/subscribing',
        },
    ];

    return (
        <div>
            <nav className={style.sidebar}>
                {elements.map(el =>
                    <div key={el.name} className={router.pathname == el.href
                        ? style.active
                        : style.sidebar__element}>
                        <Link href={el.href} passHref>
                            <a>
                                <i className={el.icon + ` ${style.icon}`} aria-hidden="true"/>
                                <span>{el.name}</span>
                            </a>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;