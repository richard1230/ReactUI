import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, NavLink, Route} from 'react-router-dom';
import ButtonExample from './lib/button.example';
import {Aside, Content, Footer, Header, Layout} from './lib/layout/layout';
import './example.scss';
import IconDemo from './lib/icon/icon.demo';
import {Icon} from "./lib";
import CitySelectDemo from "./lib/citySelect/citySelect.demo";
import DialogDemo from "./lib/dialog/dialog.demo";
import LayoutDemo from "./lib/layout/layout.demo";
import FromDemo from "./lib/form/form.demo";
import ScrollDemo from "./lib/scroll/scroll.demo";
import TreeDemo from "./lib/tree/tree.demo";


ReactDOM.render(
    <Router>
        <Layout className="site-page">
            <Header className="site-header">
                <div className="logo">
                    {/*<img src={require('./logo.png').default} width="45" height="45" alt=""/>*/}
                    <Icon name="xue"/>
                    <span> RUI </span>
                </div>

            </Header>
            <Layout>
                <Aside className="site-aside">
                    <h2>组件</h2>
                    <ul>
                        <li>
                            <NavLink to="/icon">
                                Icon
                            </NavLink>
                        </li>
                        {/*<li>*/}
                        {/*    <NavLink to="/button">*/}
                        {/*        Button*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}
                        <li>
                            <NavLink to="/dialog">
                                对话框
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/layout">
                                布局
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/form">
                                表单
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/scroll">
                                滚动条
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tree">
                                树型组件
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/citySelect">
                                城市选择组件
                            </NavLink>
                        </li>
                    </ul>
                </Aside>
                <Content className="site-main">
                    <Route path="/icon" component={IconDemo}/>
                    <Route path="/button" component={ButtonExample}/>
                    <Route path="/dialog" component={DialogDemo}/>
                    <Route path="/layout" component={LayoutDemo}/>
                    <Route path="/form" component={FromDemo}/>
                    <Route path="/scroll" component={ScrollDemo}/>
                    <Route path="/tree" component={TreeDemo}/>
                    <Route path="/citySelect" component={CitySelectDemo}/>

                </Content>
            </Layout>
            <Footer className="site-footer">
                &copy; Richard Hu
            </Footer>
        </Layout>
    </Router>
    , document.querySelector('#root'));