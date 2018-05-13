import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col} from 'antd';
import { List, Avatar, Icon } from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Tabs } from 'antd';
import { Table } from 'antd';
const TabPane = Tabs.TabPane;
const {  Content } = Layout;

class Admin extends Component {

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            filters: [{
                text: 'Joe',
                value: 'Joe',
            }, {
                text: 'Jim',
                value: 'Jim',
            }, {
                text: 'Submenu',
                value: 'Submenu',
                children: [{
                    text: 'Green',
                    value: 'Green',
                }, {
                    text: 'Black',
                    value: 'Black',
                }],
            }],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
        }, {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        }, {
            title: 'Address',
            dataIndex: 'address',
            filters: [{
                text: 'London',
                value: 'London',
            }, {
                text: 'New York',
                value: 'New York',
            }],
            filterMultiple: false,
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => a.address.length - b.address.length,
        }];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        }];

        function onChange(pagination, filters, sorter) {
            console.log('params', pagination, filters, sorter);
        }
        function onClick(pagination, filters, sorter) {
            console.log('onClick', pagination, filters, sorter);
        }
        function callback(key) {
            console.log(key);
        }
        return (
            <div className="Admin">
                <Header/>

                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="文章管理" key="1">
                                    <Table
                                        columns={columns}
                                        dataSource={data}
                                        onChange={onChange}
                                        onRow={(record) => {
                                            return {
                                                onClick: () => {console.log(record)},       // 点击行
                                                onMouseEnter: () => {},  // 鼠标移入行
                                            };
                                        }}
                                    />
                                </TabPane>
                                <TabPane tab="留言管理" key="2">Content of Tab Pane 2</TabPane>
                                <TabPane tab="浏览记录" key="3">Content of Tab Pane 3</TabPane>
                            </Tabs>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        );
    }
}

export default Admin;
