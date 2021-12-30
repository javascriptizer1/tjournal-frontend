import {Tabs} from 'antd';
import {FC} from "react";

const {TabPane} = Tabs;

type TabsCompProps = {
    activeTab: string,
    setActiveTab: (tab: string) => void
}

const TabsComp: ({activeTab}: TabsCompProps) => JSX.Element = ({activeTab, setActiveTab}: TabsCompProps) => (
    <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={(activeKey) => setActiveTab(activeKey)}>
        <TabPane tab="Популярные" key="1"/>
        <TabPane tab="По порядку" key="2"/>
    </Tabs>
);

export default TabsComp;