import { GlobalStyle } from "./style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingPage";
import { AnimeReview } from "./pages/animeReview";

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/review" element={<AnimeReview />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
