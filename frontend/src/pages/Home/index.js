import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import Form from '../../components/form/form'



const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='form'>
    <C.Container>
      <C.Title>Home</C.Title>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
      
    </C.Container>
    <Form />

   </div>

      
  );
};

export default Home;



