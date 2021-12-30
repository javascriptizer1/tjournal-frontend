import {FC, useState} from "react";
import Header from "./components/Header/Header";
import style from './main_layout.module.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import Comments from "./components/Comments/Comments";

interface MainLayoutProps {
    fullWidth?: boolean,
    commentBar?: boolean,
    className?: string,
}

export const MainLayout: FC<MainLayoutProps> = ({fullWidth, commentBar, className, children}) => {
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
    const stylesRight = [
        hide ? style.layout_right + ' ' + style.minimize
            : style.layout_right
    ]

    return (
        <>
            <Header/>
            <div className={style.main_layout}>
                {!fullWidth && <div className={style.layout_left}>
                    <Sidebar/>
                </div>}
                <main className={style.content}>{children}</main>
                {commentBar &&
                <div className={stylesRight.join(' ')}>
                    {hide
                        ? <h2 onClick={() => setHide(!hide)} className={style.rotate}>Комментарии &gt;</h2>
                        : <h2 onClick={() => setHide(!hide)}
                              style={{margin: '27px 15px', cursor: 'pointer'}}>Комментарии &gt; </h2>}
                    {!hide && <Comments/>}
                </div>
                }
            </div>
        </>
    )
}