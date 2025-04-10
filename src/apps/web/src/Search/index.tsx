import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import Fuse from "fuse.js";

import { useSearchAnime } from "../hooks/useSearchAnime";
import SearchIconSVG from "../assets/icons/search.svg";

export const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  const { searchAnime, results } = useSearchAnime();

  const handleSearch = useRef(
    debounce((value: string) => {
      if (value.trim().length > 0) {
        searchAnime({ variables: { search: value } });
      }
    }, 1000)
  ).current;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    handleSearch(value);
    setSelectedIndex(-1); 
  };

  useEffect(() => {
    if (keyword.trim().length === 0 || results.length === 0) {
      if (filteredResults.length !== 0) {
        setFilteredResults([]);
      }
      return;
    }

    const fuse = new Fuse(results, {
      keys: ["title.english", "title.romaji"],
      threshold: 0.3,
    });

    const refined = fuse.search(keyword).map((r) => r.item).slice(0, 10);
    if (JSON.stringify(refined) !== JSON.stringify(filteredResults)) {
      setFilteredResults(refined);
    }
  }, [results, keyword, filteredResults]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
        setKeyword("");
        setFilteredResults([]);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredResults.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev <= 0 ? filteredResults.length - 1 : prev - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selectedAnime = filteredResults[selectedIndex];
      console.log("Selected Anime:", selectedAnime);
      setShowSearch(false);
      setKeyword("");
      setFilteredResults([]);
      setSelectedIndex(-1);
    }
  };

  return (
    <SearchWrapper ref={searchRef}>
      {!showSearch && (
        <SearchIcon src={SearchIconSVG} onClick={() => setShowSearch(true)} />
      )}
      <SearchInput
        type="text"
        placeholder="Search anime..."
        data-visible={showSearch}
        value={keyword}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {showSearch && filteredResults.length > 0 && (
        <SearchResults>
          {filteredResults.map((anime, i) => (
            <li
              key={anime.id}
              className={i === selectedIndex ? "selected" : ""}
              onClick={() => {
                console.log("Clicked Anime:", anime);
                setShowSearch(false);
                setKeyword("");
                setFilteredResults([]);
                setSelectedIndex(-1);
              }}
            >
              {anime.title.english || anime.title.romaji}
            </li>
          ))}
        </SearchResults>
      )}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const SearchIcon = styled.img`
  cursor: pointer;
`;

const SearchInput = styled.input<{ "data-visible"?: boolean }>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: ${({ "data-visible": visible }) => (visible ? "223px" : "0px")};
  height: 32px;
  padding: ${({ "data-visible": visible }) => (visible ? "0 16px" : "0")};
  background-color: #333;
  color: white;
  border: 1.5px solid #00f5d4;
  border-radius: 16px;
  font-size: 14px;
  opacity: ${({ "data-visible": visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ "data-visible": visible }) => (visible ? "auto" : "none")};
  transition: width 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  z-index: 1;

  ::placeholder {
    color: #aaa;
  }
`;

const SearchResults = styled.ul`
  position: absolute;
  top: 42px;
  right: 4px;
  width: 234px;
  background-color: #1e1e1e;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  list-style: none;
  padding: 8px;
  margin: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  z-index: 10;

  li {
    padding: 6px 10px;
    border-radius: 4px;
    transition: background 0.2s;
    cursor: pointer;

    &.selected {
      background-color: #00f5d4;
      color: black;
    }

    &:hover {
      background-color: #333;
    }
  }
`;
