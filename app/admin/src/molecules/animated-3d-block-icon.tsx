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
    z-index: 100;
    transition: 0.3s;

    &:hover {
        background-color: #000000cc;
        transform: rotateX(0) rotateY(0) rotateZ(13deg) translateY(-4rem) !important;
        box-shadow: 0 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.4);
    }
`;

export default Animated3DBlockIcon;