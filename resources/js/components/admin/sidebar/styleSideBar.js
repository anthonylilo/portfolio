import styled from "styled-components";

export const SideBarStyles = styled.div`
    width: 20%;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #121212;
    color: #fff;

    .sidebar-logo {
        padding: 5%;
    }

    hr {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 1px;
        background-color: #fff;
        border: none;
    }

    .sidebar-links {
        font-size: 25px;
        color: #fff;
        margin: 0;
        padding: 0;
        height: 80%;
        ul {
            padding: 0;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        li {
            width: 90%;
            margin: 0% 5%;
            list-style: none;
            display: flex;
            a {
                width: 100%;
                text-align: left;
                display: block;
                border-radius: 1rem;
                padding: 5%;
                color: #fff;
                cursor: pointer;
                text-decoration: none;
            }
            a:hover {
                background-color: #a6a6a6;
            }
        }
    }

    .sidebar-links ul li a.active {
        background-color: #a6a6a6;}

    .sidebar-footer {
        padding: 4%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        a {
            width: 100%;
            border-radius: 1rem;
            font-size: 20px;
            color: #fff;
            cursor: pointer;
            margin: 2% 0%;
            text-decoration: none;
        }
        a:hover{
            color: #a6a6a6;
        }
    }
`;
