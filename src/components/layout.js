import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import { colors, media } from "../helpers/style"
import styled from "styled-components"

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { menuToggleVisible: false }
  }

  toggleMenu = () => {
    const { menuToggleVisible } = this.state;
    this.setState({ menuToggleVisible: !menuToggleVisible })
  }


  render() {
    const { children } = this.props;
    const { menuToggleVisible } = this.state;

    return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Simon Gawlik</title>
        <meta name="description" content="Simon Gawlik Personal Website Home" />
      </Helmet>
      <Header>
        <LinkHome to="/">
          <Logo>SimonGAWLIK</Logo>
        </LinkHome>
        <Hamburger onClick={this.toggleMenu}>&#9776;</Hamburger>
        <Menu menuToggleVisible={menuToggleVisible}>
          <MenuLink to="/about/">About</MenuLink>
          <MenuLink to="/writing">Writing</MenuLink>
        </Menu>
      </Header>
      <Container>
        {children}
      </Container>
    </div>
    )
  }
}

const Header = styled.div`
  border-bottom: 1px solid #eaeaeb;
  text-align: right;
  line-height: 70px;
`

const LinkHome = styled(Link)`
  float: left;
  text-shadow: none;
  background-image: none;
  text-decoration: none;
  margin: 0 0 0 30px;
`

const Logo = styled.div`
  display: "inline-block";
  color: ${colors.mandarinRed};
  margin: 0;
  vertical-align: "middle";
  font-family: 'Libre Barcode 128 Text', Arial, Helvetica, sans-serif;
  font-size: 52px;
`

const Hamburger = styled.div`
  margin: 0 40px 0 0;
  font-size: 26px;
  line-height: 70px;
  display: none;
  color: ${colors.mandarinRed};

  ${media.phoneOnly`
    display: inline-block;
    cursor: pointer;
  `}
`

const Menu = styled.div`
  margin: 0 30px 0 0;

  ${media.phoneOnly`
    text-align: center;
    width: 100%;
    display: ${props => props.menuToggleVisible ? "block" : "none"};
  `}
`

const MenuLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
  line-height: 70px;

  ${media.phoneOnly`
    display: block;
    border-top: 1px solid #eaeaeb;
    margin: 0;
  `}
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 650px;
  padding: 1rem 1rem 0 1rem;
`

export default Layout
