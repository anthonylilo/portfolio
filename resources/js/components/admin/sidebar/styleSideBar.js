import styled from "styled-components";

export const SideBarStyles = styled.div`
    width: 300px;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    color: #fff;

    hr {
        width: 100%;
        height: 1px;
        background-color: #fff;
        border: none;
    }

    .sidebar-links {
        font-size: 20px;
        color: #fff;
        margin: 0;
        padding: 0;
        height: 100%;
        ul {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-wrap: wrap;
        }
        li {
            width: 90%;
            height: 50px;
            list-style: none;
            background-color: pink;
            margin-bottom: 3%;
            border-radius: 5rem;
            text-align: left;
            padding: 2%;
            a {
                color: #fff;
                cursor: pointer;
                text-decoration: none;
            }
        }
    }
`;
