import styled from "styled-components";

const Animated3DBlockIcon = styled.div`
    width: 30%;
    height: 30%;
    background-color: #${props => props.variant === 'dark' ? "00000077" : "ffffffee"};
    border-left: solid 0.3rem #${props => props.variant === 'dark' ? "11111177" : "ddddddee"};
    border-bottom: solid 0.5rem #${props => props.variant === 'dark' ? "17171777" : "aaaaaaee"};;
    border-radius: 20px;
    margin: 1.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    transition: 0.3s;
    animation: float-icons 5s ease-in-out infinite;

    @keyframes float-icons {
        0% {
            box-shadow: 0 1rem 1rem 0.33rem rgba(0, 0, 0, 0.6);
            transform: translateY(-4rem) translateX(4rem);
        }

        50% {
            box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.2);
            transform: translateY(0rem) translateX(0rem);
        }

        100% {
            box-shadow: 0 1rem 1rem 0.33rem rgba(0, 0, 0, 0.6);
            transform: translateY(-4rem) translateX(4rem);
        }
    }

    &:hover {
        background-color: #${props => props.variant === 'dark' ? "ffffffee" : "000000cc"};
        border-left: solid 0.3rem #${props => props.variant === 'dark' ? "ddddddee" : "111111cc"};
        border-bottom: solid 0.5rem #${props => props.variant === 'dark' ? "aaaaaaee" : "171717cc"};
        cursor: pointer;
    }
`;

export default Animated3DBlockIcon;