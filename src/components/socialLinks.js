import React from "react";
import styled from "styled-components"
import { FaFacebook, FaGithub, FaLinkedin, FaMedium, FaTwitter } from 'react-icons/fa';

export default () => (
  <>
    <ContactLink href="https://www.linkedin.com/in/simon-gawlik-13878457" target="_blank">
      <FaLinkedin size="32" />
    </ContactLink>
    <ContactLink href="https://github.com/simongawlik" target="_blank">
      <FaGithub size="32" />
    </ContactLink>
    <ContactLink href="https://twitter.com/sgawi" target="_blank">
      <FaTwitter size="32" />
    </ContactLink>
    <ContactLink href="https://medium.com/@sgawlik" target="_blank">
      <FaMedium size="32" />
    </ContactLink>
    <ContactLink href="https://www.facebook.com/simon.gawlik" target="_blank">
      <FaFacebook size="32" />
    </ContactLink>
  </>
)

const ContactLink = styled.a`
  margin-right: 15px;
`
