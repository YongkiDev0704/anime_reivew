import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import { GNB } from "../GNB";

export const Layout = () => {
  const location = useLocation();

  return (
    <PageWrapper>
      <GNB />
      <Outlet />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative; /* ✅ GNB absolute 기준 */
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;
