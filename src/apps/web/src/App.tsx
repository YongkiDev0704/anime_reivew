import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GlobalStyle } from "./style/GlobalStyle";
import { LandingPage } from "./pages/landingPage";
import { AnimeReview } from "./pages/animeReview";
import { Layout } from "./components/Layout";
import { Error } from "./pages/Error";
import { ViewAllReview } from "./pages/viewAllReview";
import { ScrollToTop } from "./components/ScrollToTop";
import { ReviewLayout } from "./components/ReviewLayout";
import { LimitExceedPopUp } from "./components/LimitExceedPopUp";

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter >
      <ScrollToTop />
      <LimitExceedPopUp />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="*" element={<Error />} />
            <Route path="review/:id" element={<ReviewLayout />}>
              <Route index element={<AnimeReview />} />
              <Route path="viewall" element={<ViewAllReview />} />
            </Route>
          </Route>
         </Routes>
      </BrowserRouter>
    </>
  );
};
