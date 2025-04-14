import styled from "styled-components";
import dotMenu from "../../assets/icons/moremenu.svg";
import { useEffect, useRef, useState } from "react";


type ReviewDropDownProps = {
    onEdit: () => void;
    onDelete: () => void;
}

export const ReviewDropDown = ({onEdit, onDelete}: ReviewDropDownProps) => {

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close if Outter Area is clicked
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <ReviewDropDownBox ref={menuRef}>
            <MenuButton onClick={() => setOpen((prev) => !prev)} src={dotMenu} />
                {open && (
                    <Dropdown>
                    <MenuItem onClick={() => { setOpen(false); onEdit(); }}>Edit</MenuItem>
                    <MenuItem onClick={() => { setOpen(false); onDelete(); }}>Delete</MenuItem>
                    </Dropdown>
                )}
        </ReviewDropDownBox>
    );
}

const ReviewDropDownBox = styled.div`
    background-color: var(--footer-background);
    position: relative;
    display: inline-block;
`;

const MenuButton = styled.img`
    width: 30px;
    height: 30px;
    border: none;
    cursor: pointer;
`;

const Dropdown = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 4px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
    z-index: 100;
`;

const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    width: 70px;
    height: 20px;
    padding: 8px 12px;
    cursor: pointer;
    &:hover {
        background: #f0f0f0;
    }
`;
