import styled from "styled-components";
import { Outlet } from "react-router-dom";

import { GNB } from "../GNB";
import { Footer } from "../Footer";

export const Layout = () => {

  return (
    <PageWrapper>
      <GNB />
      <Outlet />
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative; 
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;
