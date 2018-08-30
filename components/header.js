import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import fetch from '../api/fetch';
import { Colors } from './theme';

class Header extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        user: PropTypes.object.isRequired,
    };
    static defaultProps = {
        title: 'NextJS BLOG',
    };
    state = {
        name: '',
        password: '',
    }
    async login() {
        const { name, password } = this.state;
        const res = await fetch.login(name, password);
        const data = res.data;
        if (data.msg === 'success') {
            localStorage.setItem('token', data.token);
            const user = await fetch.loadUser();
            if (user && this.props.onLogin) {
                alert(`Login ${user.name}`);
                this.props.onLogin(user);
            }
        }
    }
    async signup() {
        const { name, password } = this.state;
        const res = await fetch.signup(name, password);
        const data = res.data;
        console.log('signup data', data);
        if (data.msg === 'success') {
            localStorage.setItem('token', data.token);
            const user = await fetch.loadUser();
            if (user && this.props.onLogin) {
                alert(`signup ${user.name}`);
                this.props.onLogin(user);
            }
        }
    }
    logout() {
        localStorage.removeItem('token');
        if (this.props.onLogout) {
            this.props.onLogout();
        }
    }
    renderLoginForm() {
        return (
            <React.Fragment>
                <InputWrapper>
                    <InputTitle>Name</InputTitle>
                    <Input
                        placeholder="name"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputTitle>Password</InputTitle>
                    <Input
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </InputWrapper>
                <SubmitButton onClick={() => this.login()}>Login</SubmitButton>
                <SubmitButton onClick={() => this.signup()}>Signup</SubmitButton>
            </React.Fragment>
        );
    }
    renderUserInfo(user) {
        return (
            <div>
                {user.name}
                <SubmitButton onClick={() => this.logout()}>Logout</SubmitButton>
            </div>
        );
    }
    render() {
        const { title, user } = this.props;
        return (
            <Root>
                <Section>
                    <Title>{title}</Title>
                </Section>
                <Section>
                    
                </Section>
                <Section>
                    {user ? this.renderUserInfo(user) : this.renderLoginForm()}
                </Section>
            </Root>
        );
    }
}

const Root = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    box-shadow: 5px 5px 20px #ccc;
    margin-bottom: 10px;
    background-color: white;
`;

const Section = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:first-child {
        margin-left: 10px;
    }
    &:last-child {
        margin-right: 20px;
    }
`;

const Title = styled.p`
    font-size: 40px;
    font-weight: bold;
`;

const InputWrapper = styled.div`
    margin: 0 10px;
`;

const InputTitle = styled.p`
    margin: 0;
    font-size: 10px;
`;

const Input = styled.input`
    height: 20px;
`;

const SubmitButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: #f48f42;
    color: white;
`;

export default Header;
