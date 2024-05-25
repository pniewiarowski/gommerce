import styled from "styled-components";

const Animated3DBlockIcon = styled.div`
    width: 30%;
    height: 30%;
    background-color: #00000077;
    border-left: solid 0.3rem #11111177;
    border-bottom: solid 0.5rem #17171744;
    border-radius: 20px;
    margin: 1.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: float-court-lines 6s ease-in-out infinite;
    z-index: 100;
    
    &:hover {
        background-color: #000000cc;
        cursor: pointer;
    }

    @keyframes float-court-lines {
        0% {
            box-shadow: 0 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.4);
            transform: translateY(-1rem) translateX(1rem);
        }
        
        50% {
            box-shadow: 0 0rem 0rem 0rem rgba(0, 0, 0, 0.4);
            transform: translateY(0rem) translateX(0rem);
        }
        
        100% {
            box-shadow: 0 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.4);
            transform: translateY(-1rem) translateX(1rem);
        }
    }
`;

export default Animated3DBlockIcon;