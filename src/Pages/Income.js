import Sidebar from "../Components/Sidebar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useRef } from "react";

import { app } from "../Firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

function Income() {
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const IncomeNameRef = useRef();
  const IncomeQuantityRef = useRef();
  const IncomeAmountRef = useRef();

  function setDocument() {
    const IncomeName = IncomeNameRef.current.value;
    const IncomeQuantity = IncomeQuantityRef.current.value;
    const IncomeAmount = IncomeAmountRef.current.value;

    let UserId;

    onAuthStateChanged(auth, (user) => {
      UserId = user.uid;
    });

    setDoc(doc(db, "Income-Data", UserId), {
      UserId: UserId,
      IncomeName: IncomeName,
      IncomeQuantity: IncomeQuantity,
      IncomeAmount: IncomeAmount,
    });
  }

  return (
    <div className="Income">
      <Sidebar />
      <Button variant="primary" onClick={handleShow}>
        Create Income
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Income</Modal.Title>
        </Modal.Header>
        <select>
          <option value={"select"}> Select Items </option>
          <option value={"one"}>one</option>
          <option value={"two"}>two</option>
          <option value={"three"}>three</option>
        </select>
        <FormControl ref={IncomeNameRef} type="text" placeholder="IncomeName" />
        <FormControl ref={IncomeQuantityRef} type="text" placeholder="IncomeQuantity" />
        <FormControl ref={IncomeAmountRef} type="text" placeholder="IncomeAmount" />
        <FormControl type="date" placeholder="Transaction Date" />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={setDocument}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Amount</th>
            <th>Item ID</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Income;
