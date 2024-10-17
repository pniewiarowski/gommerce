import styled from "styled-components";

const Animated3DBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    background-image: linear-gradient(50deg, #272727 30%, #373737);
    border-left: solid 0.5rem #111111;
    border-bottom: solid 0.8rem #171717;
    border-radius: 20px;
    transform: rotateX(30deg) rotateY(3deg) rotateZ(-20deg);
    animation: float-court 5s ease-in-out infinite;

    &::before {
        content: "";
        border-left: solid 4rem #272727;
        border-right: solid 4rem #272727;
        border-top: solid 4rem #272727;
        border-radius: 60px 60px 0 0;
        position: absolute;
        top: -140px;
        width: 400px;
        height: 150px;
    }

    @keyframes float-court {
        0% {
            box-shadow: 0 2rem 2rem 2rem rgba(0, 0, 0, 0.4);
            transform: translateY(-2rem) rotateX(40deg) rotateY(9deg) rotateZ(-20deg);
        }
        
        50% {
            box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.1);
            transform: translateY(2rem) rotateX(40deg) rotateY(9deg) rotateZ(-20deg);
        }
        
        100% {
            box-shadow: 0 2rem 2rem 2rem rgba(0, 0, 0, 0.4);
            transform: translateY(-2rem) rotateX(40deg) rotateY(9deg) rotateZ(-20deg);
        }
    }
`;

export default Animated3DBlock;
