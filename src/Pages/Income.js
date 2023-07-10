import Sidebar from "../Components/Sidebar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useRef } from "react";

import { app } from "../Firebase";
import { collection, deleteDoc, getDocs, getFirestore, query, where, updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import swal from "sweetalert";



function Income() {
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();

////FETCHING DATA FROM FIRESTORE

    const [IncomeList, setIncomeList] = useState([])

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const UserId = user.uid

          const FetchData = async () => {
            let IncomeItem = []
            const queryDocument = query(
              collection(db, "Income-data"), where("UserId", "==", UserId)
            )
              const querySnapShot = await getDocs(queryDocument)

              querySnapShot.forEach((IncomeDoc) => {
                IncomeItem.push({ Id: IncomeDoc.Id, ...IncomeDoc.data() })
                setIncomeList([...IncomeItem])
              })
          }
          FetchData()
        }
      })
    })



    

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // UPDATE MODAL //

  const [update, updateShow] = useState(false);
  const handleUpdateClose = () => updateShow(false)
  const handleUpdateShow = () => updateShow(true)

  function updateIncome(IncomeDocId){
    handleUpdateShow()
    const docId = IncomeDocId

    window.updateIncome = function(){
       const IncomeName = IncomeNameRef.current.value;
       const IncomeQuantity = IncomeQuantityRef.current.value;
       const IncomeAmount = IncomeAmountRef.current.value;
       const Date = DateRef.current.value;

       const updateIncome = doc(db, 'Income-data', docId)
       updateDoc(updateIncome, {
         IncomeName: IncomeName,
            IncomeQuantity: IncomeQuantity,
            IncomeAmount: IncomeAmount,
            Date: Date,
          })
          .then(() => {
            window.location.reload()
          })
    }

  }

  const IncomeNameRef = useRef();
  const IncomeQuantityRef = useRef();
  const IncomeAmountRef = useRef();
  const DateRef = useRef()

  function setDocument() {
    const IncomeName = IncomeNameRef.current.value;
    const IncomeQuantity = IncomeQuantityRef.current.value;
    const IncomeAmount = IncomeAmountRef.current.value;
    const Date = DateRef.current.value;


    onAuthStateChanged(auth, (user) => {
    if(user){
      const UserId = user.uid

      const newIncome = doc(collection(db, 'Income-data'))

          setDoc(newIncome, {
            UserId: UserId,
            IncomeDocId: newIncome.id,
            IncomeName: IncomeName,
            IncomeQuantity: IncomeQuantity,
            IncomeAmount: IncomeAmount,
            Date: Date,
          })
          .then(() => {
            window.location.reload()
          })

    }
    });
  }

    function deleteIncome(IncomeDocId) {
      const docid = IncomeDocId;

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteDoc(doc(db, "Income-data", docid)).then(() => {
            swal("deleted", "", "success");
            swal(`your income has been deleted`, { icon: "success" }).then(
              () => {
                window.location.reload();
              }
            );
          });
        } else {
          swal("cancelled");
        }
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
        <FormControl
          ref={IncomeQuantityRef}
          type="text"
          placeholder="IncomeQuantity"
        />
        <FormControl
          ref={IncomeAmountRef}
          type="text"
          placeholder="IncomeAmount"
        />
        <FormControl ref={DateRef} type="date" placeholder="Date" />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={setDocument}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    

      <Modal show={update} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>update Income</Modal.Title>
        </Modal.Header>
        <select>
          <option value={"select"}> Select Items </option>
          <option value={"one"}>one</option>
          <option value={"two"}>two</option>
          <option value={"three"}>three</option>
        </select>
        <FormControl ref={IncomeNameRef} type="text" placeholder="IncomeName" />
        <FormControl
          ref={IncomeQuantityRef}
          type="text"
          placeholder="IncomeQuantity"
        />
        <FormControl
          ref={IncomeAmountRef}
          type="text"
          placeholder="IncomeAmount"
        />
        <FormControl ref={DateRef} type="date" placeholder="Date" />
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleUpdateClose}>
            Close
          </Button>
          <Button variant="primary" onClick={window.updateIncome}>
            Update
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
          {IncomeList.map((IncomeItem) => (
            <tr key={Math.random()}>
              <td>{IncomeItem.IncomeName}</td>
              <td>{IncomeItem.IncomeAmount}</td>
              <td>{IncomeItem.IncomeQuantity}</td>
              <td>{IncomeItem.Date}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteIncome(IncomeItem.IncomeDocId)}
                >
                  delete
                </Button>
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => updateIncome(IncomeItem.IncomeDocId)}
                >
                  update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Income;
