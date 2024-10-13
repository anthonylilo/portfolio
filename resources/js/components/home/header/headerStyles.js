import styled from "styled-components";
import imageBackground from "../../../../assets/images/fondo-header.webp";

export const HeaderStyles = styled.header`
    background-image: url(${imageBackground});
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    color: #fff;
    height: 100vh;

    .container {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }

    h1 {
        font-size: 3.5rem;
        margin-block-start: 0.35em;
        margin-block-end: 0.35em;
    }

    h2 {
        font-size: 2rem;
        margin-block-start: 0.35em;
        margin-block-end: 0.35em;
    }

    span {
        font-size: 4rem;
        margin-block-start: 0.3em;
        margin-block-end: 0.3em;
    }

    @media screen and (max-width: 900px) {
        height: 100vh;
        background-position: 70% 100%;
        background-size: cover;
        .container {
            justify-content: center;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.1);
        }

        h2 {
            font-size: 1.8rem;
        }

        span {
            font-size: 3rem;
        }

        .btn-primary {
            margin-bottom: 10%;
        }
    }
`;
