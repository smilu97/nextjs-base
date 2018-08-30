import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import fetch from '../api/fetch';

// Import components
import Header from '../components/header';

export default class HomePage extends React.Component {
    static async getInitialProps({ req }) {
        const res = await fetch.getHome();
        const data = res.data;
        return { message: data.msg };
    }
    state = {
        user: null,
    };
    handleLogin(user) {
        this.setState({ user })
    }
    handleLogout() {
        this.setState({ user: null });
    }
    componentDidMount() {
        fetch.loadUser().then(user => {
            if (user) {
                this.setState({ user });
            }
        });
    }
    render() {
        const postings = [  // Dummy postings data
            {
                id: 0,
                title: "My custom React stack - 1",
                description: "React 리액트는 기본적으로는 HTML DOM에 원하는 DOMNode(?)를 동적으로 그려주는 프레임워크이다. 여기서 동적이란, state라고 부르게 될...",
                createdAt: Date.now(),
            },
            {
                id: 1,
                title: "My custom React stack - 1",
                description: "React 리액트는 기본적으로는 HTML DOM에 원하는 DOMNode(?)를 동적으로 그려주는 프레임워크이다. 여기서 동적이란, state라고 부르게 될...",
                createdAt: Date.now(),
            },
            {
                id: 2,
                title: "My custom React stack - 1",
                description: "React 리액트는 기본적으로는 HTML DOM에 원하는 DOMNode(?)를 동적으로 그려주는 프레임워크이다. 여기서 동적이란, state라고 부르게 될...",
                createdAt: Date.now(),
            },
            {
                id: 3,
                title: "My custom React stack - 1",
                description: "React 리액트는 기본적으로는 HTML DOM에 원하는 DOMNode(?)를 동적으로 그려주는 프레임워크이다. 여기서 동적이란, state라고 부르게 될...",
                createdAt: Date.now(),
            },
            {
                id: 4,
                title: "My custom React stack - 1",
                description: "React 리액트는 기본적으로는 HTML DOM에 원하는 DOMNode(?)를 동적으로 그려주는 프레임워크이다. 여기서 동적이란, state라고 부르게 될...",
                createdAt: Date.now(),
            },
            {
                id: 5,
                title: "My custom React stack - 1",
                description: "React 리액트는 기본적으로는 HTML DOM에 원하는 DOMNode(?)를 동적으로 그려주는 프레임워크이다. 여기서 동적이란, state라고 부르게 될...",
                createdAt: Date.now(),
            },
        ];
        const user = this.props.user ? this.props.user : this.state.user;
        return (
            <Root>
                <Head>
                    <title>HomePage</title>
                </Head>
                <Header
                    title="호옹이"
                    onLogin={user => this.handleLogin(user)}
                    onLogout={() => this.handleLogout()}
                    user={user}
                />
                <Body>
                    <LeftSection>
                        <LeftItemWrapper>
                            <Thumbnail src="/static/favicon.png" />
                            <Nickname>GIM YEONGJIN</Nickname>
                            <Description>Developer studying at HYU, SOCC</Description>
                        </LeftItemWrapper>
                        <LeftItemWrapper>
                            <CopyRight>2018 Gim Yeongjin</CopyRight>
                        </LeftItemWrapper>
                    </LeftSection>
                    <RightSection>
                        {postings.map(posting => (
                            <Posting key={posting.id} {...posting} />
                        ))}
                    </RightSection>
                </Body>
            </Root>
        );
    }
}

function Posting(props) {
    return (
        <PostingPaper>
            <PostingTitle>{props.title}</PostingTitle>
            <PostingDescription>{props.description}</PostingDescription>
        </PostingPaper>
    );
}
Posting.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};
Posting.defaultProps = {
    title: 'No Title',
    description: '',
};

const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Body = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    background-color: #eee;
`;

const LeftSection = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: white;
`;

const LeftItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RightSection = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: left;
    flex-grow: 1;
    height: 100%;
    padding: 10px;
    overflow: scroll;
`;

const Thumbnail = styled.img`
    width: 200px;
    height: 200px;
`;

const Nickname = styled.p`
    font-size: 20px;
`;

const Description = styled.p`
    font-size: 10px;
`;

const CopyRight = styled.p`
    font-size: 10px;
`;

const PostingPaper = styled.div`
    width: 80%;
    height: 150px;
    background-color: white;
    box-shadow: 5px 5px 20px #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    transition: all 0.2s;
    position: relative;
    left: 0px;
    top: 0px;

    &:hover {
        left: -5px;
        top: -5px;
    }
`;

const PostingTitle = styled.p`
    font-size: 30px;
`;

const PostingDescription = styled.p`
    font-size: 15px;
    margin-top: 15px;
`;
