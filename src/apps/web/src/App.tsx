import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GlobalStyle } from "./style/GlobalStyle";
import { LandingPage } from "./pages/landingPage";
import { AnimeReview } from "./pages/animeReview";
import { Layout } from "./components/Layout";
import { Error } from "./pages/Error";
import { ViewAllReview } from "./pages/viewAllReview";

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="*" element={<Error />} />
            <Route path="/review/:id" element={<AnimeReview />} />
            <Route path="/review/viewall/:id" element={<ViewAllReview />} />
          </Route>
         </Routes>
      </BrowserRouter>
    </>
  );
};
