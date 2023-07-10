import Sidebar from "../Components/Sidebar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

import { app } from "../Firebase";
import { deleteDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

import { collection } from "firebase/firestore";
import swal from "sweetalert";

function Expenses() {
  const auth = getAuth()
  const db = getFirestore(app)
  const navigate = useNavigate()

  ///FETCH DATA FROM FIRESTORE

  const [ExpenseList, setExpenseList] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const UserId = user.uid;

        const FetchData = async () => {
          let ExpenseItem = [];
          const queryDocument = query(
            collection(db, "Expense-data"),
            where("UserId", "==", UserId)
          );
          const querySnapShot = await getDocs(queryDocument);

          querySnapShot.forEach((ExpenseDoc) => {
            ExpenseItem.push({ Id: ExpenseDoc.Id, ...ExpenseDoc.data() });
            setExpenseList([...ExpenseItem]);
          });
        };
        FetchData();

      }

    });
  })
  




  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate('/')
    }
  })
  const [show, setShow] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// UPDATE MODAL //

  const [update, updateShow] = useState(false)
  const handleUpdateClose = () => updateShow(false)
  const handleUpdateShow = () => updateShow(true)

  function updateExpense (ExpenseDocId){
    handleUpdateShow()
    const docId = ExpenseDocId

    window.updateExpense = function(){
       const ExpenseName = ExpenseNameRef.current.value;
    const ExpenseQuantity = ExpenseQuantityRef.current.value;
    const ExpenseAmount = ExpenseAmountRef.current.value;
    const Date = DateRef.current.value;

    const updateExpense = doc(db, 'Expense-data', docId)
    updateDoc(updateExpense, {
      ExpenseName: ExpenseName,
      ExpenseQuantity: ExpenseQuantity,
      ExpenseAmount: ExpenseAmount,
      Date: Date,
    })
    .then(() => {
      window.location.reload();
    })
    }
  }

  const ExpenseNameRef = useRef();
  const ExpenseQuantityRef = useRef();
  const ExpenseAmountRef = useRef();
  const DateRef = useRef()

  function setDocument() {
    const ExpenseName = ExpenseNameRef.current.value;
    const ExpenseQuantity = ExpenseQuantityRef.current.value;
    const ExpenseAmount = ExpenseAmountRef.current.value;
    const Date = DateRef.current.value;

    
    onAuthStateChanged(auth, (user) => {
      if(user){
        const UserId = user.uid;

        const newExpense = doc(collection(db, 'Expense-data'))

        setDoc(newExpense, {
          UserId: UserId,
          ExpenseDocId: newExpense.id,
          ExpenseName: ExpenseName,
          ExpenseQuantity: ExpenseQuantity,
          ExpenseAmount: ExpenseAmount,
          Date: Date,
        });
      }      
    })
    
      }

      function deleteExpense(ExpenseDocId) {
        const docid = ExpenseDocId

       swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this imaginary file!",
         icon: "warning",
         buttons: true,
         dangerMode: true,

       }).then((willDelete) => {
         if (willDelete) {
          deleteDoc(doc(db, "Expense-data", docid)).then(() => {
            swal("deleted","", "success")
            swal(`your expense has been deleted`,
            { icon: "success" })
            .then(() => {
                window.location.reload();
              }
            );
            
           })
         } else {
           swal("cancelled");
         }
       });
      }

  return (
    <div className="Expenses">
      <Sidebar />
      <Button variant="primary" onClick={handleShow}>
        Create Expense
      </Button>
      <div className="Expenses1">
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
          <FormControl ref={ExpenseNameRef} type="text" placeholder="ExpenseName" />
          <FormControl ref={ExpenseQuantityRef} type="text" placeholder="ExpenseQuantity" />
          <FormControl ref={ExpenseAmountRef} type="text" placeholder="ExpenseAmount" />
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
            <Modal.Title>Add Income</Modal.Title>
          </Modal.Header>
          <select>
            <option value={"select"}> Select Items </option>
            <option value={"one"}>one</option>
            <option value={"two"}>two</option>
            <option value={"three"}>three</option>
          </select>
          <FormControl ref={ExpenseNameRef} type="text" placeholder="ExpenseName" />
          <FormControl ref={ExpenseQuantityRef} type="text" placeholder="ExpenseQuantity" />
          <FormControl ref={ExpenseAmountRef} type="text" placeholder="ExpenseAmount" />
          <FormControl ref={DateRef} type="date" placeholder="Date" />
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUpdateClose}>
              Close
            </Button>
            <Button variant="primary" onClick={window.updateExpense}>
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
            {ExpenseList.map((ExpenseItem) => (
              <tr key = {Math.random()}>
                <td>{ExpenseItem.ExpenseName}</td>
                  <td>{ExpenseItem.ExpenseAmount}</td>
                  <td>{ExpenseItem.ExpenseQuantity}</td>
                  <td>{ExpenseItem.Date}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteExpense(ExpenseItem.ExpenseDocId)}>delete</Button>
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => updateExpense(ExpenseItem.ExpenseDocId)}>update</Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Expenses