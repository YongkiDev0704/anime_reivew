import styled from "styled-components";

import Icon from "../../assets/icons/logo.svg";
import { Copyright, Github, Mail, } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const Footer = () => {
  const location = useParams<string>();

  return (
    <FooterWrapper>
      <UpperSection>
        <Branding>
            <img src={Icon} alt="Anigiri" width={56} />
            <Name>Anigiri</Name>
        </Branding>
        <FooterNav>

          <NavItem to="/" $active={location.pathname === "/"}>Home</NavItem>
          <NavItem to="/category" $active={location.pathname === "/category"}>Category</NavItem>
          <NavItem to="/about" $active={location.pathname === "/about"}>About</NavItem>
        </FooterNav>
        <Section>
          <Tag style={{ color: "var(--accent-color)" }}> <strong>Contributors</strong> </Tag>
          <Tag> DongHyeon Lee </Tag>
          <Tag> YongKi Kim </Tag>
          <Tag as="a" href="https://www.jongseok.art/" target="_blank"> Jongseok We </Tag>
        </Section>
        <Section>
          <Tag style={{ color: "var(--accent-color)" }}>
             <strong>Contact Us</strong> 
          </Tag>
          <TagWithIcon>
            <Mail />
            anigiri@example.com 
          </TagWithIcon>
          <TagWithIcon as="a" href="https://github.com/YongkiDev0704/anime_reivew/tree/main" target="_blank">
            <Github /> 
            Anigiri
          </TagWithIcon>
        </Section>
      </UpperSection>
      <LowerSection>
        <Copyright />
        <Tag style={{ fontSize: "16px" }}> 2025 Project Anigiri | Data Provided by AniList, TMDB </Tag>
      </LowerSection>
    </FooterWrapper>
  )
};

const FooterWrapper = styled.div`
  margin-top: 100px;
  height: 366px;
  display: flex;
  flex-direction: column;
  gap: 70px;
  color: white;
`;

const UpperSection = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 176px;
  text-decoration: none;
  padding-left: 80px;
`;

const Branding = styled.div`
  display: flex;
  align-items: flex-start;
  color: white;
  text-decoration: none;
  gap: 8px;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  font-size: 20px;
  margin: 0;
  color: white;
  text-decoration: none;
`;

const Name = styled.p`
  font-weight: bold;
  font-style: italic;
  font-size: 40px;
  margin: 0;
  color: white;
`;

const FooterNav = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 30px;
`;

const Tag = styled.p`
  font-size: 20px;
  margin: 0;
  color: white;
  text-decoration: none;
`;

const TagWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: white;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const LowerSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
