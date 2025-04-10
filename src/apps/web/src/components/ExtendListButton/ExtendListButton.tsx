import styled from "styled-components";

import { ChevronDown, ChevronUp } from "lucide-react";

type ExtendListButtonProps = {
    visibleItems: number; // Number of Items to show
    toggleExtend: number; // Number to decide if Chevron Button should be Up or Down
    onToggle: () => void;
};

export const ExtendListButton = ({ visibleItems, toggleExtend, onToggle }: ExtendListButtonProps) => {
        return (
            <ExtendListButtonWrapper onClick={onToggle}>
                {visibleItems === toggleExtend ? (
                    <ChevronDown size={32} color="white" />
                ) : (
                    <ChevronUp size={32} color="white" />
                )}
            </ExtendListButtonWrapper>
        );
};

const ExtendListButtonWrapper = styled.div`
    display: grid;
    place-items: center;
    margin: 20px;
`