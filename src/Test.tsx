import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import jsonData from './data.json';


export default function Test() {

    const loadData = () => JSON.parse(JSON.stringify(jsonData));

    const [jsonArray, setJsonArray] = useState<any>(loadData);
    useEffect(() => {
        console.log("Lo", jsonArray);
        
    }, [])

    const { Header, Content, Footer, Sider } = Layout;

    const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    const items3: MenuProps['items'] = jsonArray?.map((first: { name: any; children: { name: any; }[]; }, index: number) => {
        const key = String(index + 1);

        return {
            key: `sub${key}+index`,
            // icon: React.createElement(icon),
            label: `${first.name}`,
            // label: `subnav ${key}`,

            children: first.children?.map((second: {
                [x: string]: any; name: any; }, j: number) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: `second${second.name + j+1}`,
                    label: `${second.name}`,
                    children: second?.children?.map((third: {
                        [x: string]: any; name: any; }, p: number) => {
                        const subKey2 = index * 4 + j + p + 1;
                        return {
                            key: `third${third.name + p + 1}`,
                            label: `${third.name}`,
                            children: third?.children?.map((fourth: { name: any; }, r: number) => {
                                const subKey3 = index * 4 + j + p + r + 1;
                                return {
                                    key: `fourth${fourth.name + r + 1}`,
                                    label: `${fourth.name}`,
                                }
                            })
                        }
                        
                    })
                    
                };
            }),

        };

    });


    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,

                children: new Array(4).fill(null).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,
                    };
                }),
            };
        },
    );


    const {
        token: { colorBgContainer },
      } = theme.useToken();


    return (
        <div>

            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                        <Sider style={{ background: colorBgContainer }} width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                                items={items3}
                            />
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>


        </div>
    )
}
