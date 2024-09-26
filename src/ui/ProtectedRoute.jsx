/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1.Load the authenticated user
  const { isLoading, isAuth } = useUser();

  //2.If no authenticaed user, redirect back the user to login page
  useEffect(
    function () {
      if (!isAuth && !isLoading) navigate("/login");
    },
    [isAuth, isLoading, navigate]
  );

  //3.Whilw loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuth) return children;
}
