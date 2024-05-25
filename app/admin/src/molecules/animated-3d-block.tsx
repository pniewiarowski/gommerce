import styled from "styled-components";

const Animated3DBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 640px;
    height: 640px;
    display: flex;
    flex-wrap: wrap;
    background-image: linear-gradient(50deg, #272727 30%, #373737);
    border-left: solid 0.5rem #111111;
    border-bottom: solid 0.8rem #171717;
    transform: rotateX(30deg) rotateY(3deg) rotateZ(-20deg);
    animation: float-court 6s ease-in-out infinite;

    &::before {
        content: "";
        border-left: solid 3.5rem #272727;
        border-right: solid 3.5rem #272727;
        border-top: solid 3.5rem #272727;
        border-radius: 30px;
        position: absolute;
        top: -170px;
        width: 450px;
        height: 200px;
    }

    @keyframes float-court {
        0% {
            box-shadow: 0 3rem 3rem 3rem rgba(0, 0, 0, 0.6);
            transform: translateY(-2rem) rotateX(50deg) rotateY(3deg) rotateZ(-20deg);
        }
        
        50% {
            box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.2);
            transform: translateY(2rem) rotateX(50deg) rotateY(3deg) rotateZ(-20deg);
        }
        
        100% {
            box-shadow: 0 3rem 3rem 3rem rgba(0, 0, 0, 0.6);
            transform: translateY(-2rem) rotateX(50deg) rotateY(3deg) rotateZ(-20deg);
        }
    }
`;

export default Animated3DBlock;
