import styled from "styled-components";

const Animated3DBlockIcon = styled.div`
    width: 32%;
    height: 32%;
    background-color: #00000077;
    border-left: solid 0.5rem #11111177;
    border-bottom: solid 0.8rem #17171777;
    margin: 1px 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: float-court-lines 6s ease-in-out infinite;
    z-index: 100;
    
    &:hover {
        background-color: #000000;
        cursor: pointer;
    }

    @keyframes float-court-lines {
        0% {
            transform: translateY(-3rem) translateX(3rem);
        }
        
        50% {
            transform: translateY(0rem) translateX(0rem);
        }
        
        100% {
            transform: translateY(-3rem) translateX(3rem);
        }
    }
`;

export default Animated3DBlockIcon;