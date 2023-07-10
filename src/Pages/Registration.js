import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { app } from "../Firebase";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";


function Registration() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const NameRef = useRef()

  const navigate =useNavigate()


  function create (){
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const Name = NameRef.current.value


    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...

                navigate("/Dashboard");

        console.log("Success")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      
      });
  }
  return (
    <div className="Registration">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail1">
          <Form.Label>Full Names</Form.Label>
          <Form.Control type="Name" ref={NameRef} placeholder="Full Name" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={create}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Registration;
