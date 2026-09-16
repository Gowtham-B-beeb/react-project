import { useEffect, useState } from "react";

import "./Payments.css";

function Payments() {

  const [payments, setPayments] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("payments")
      ) || []
    );
  });

  const [student, setStudent] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Paid");

  const [editId, setEditId] = useState(null);


  // SAVE TO LOCAL STORAGE

  useEffect(() => {

    localStorage.setItem(
      "payments",
      JSON.stringify(payments)
    );

  }, [payments]);


  // ADD / UPDATE PAYMENT

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      student === "" ||
      amount === "" ||
      date === ""
    ) {
      alert("Please fill all fields");
      return;
    }


    if (editId !== null) {

      const updatedPayments =
        payments.map((payment) =>
          payment.id === editId
            ? {
                ...payment,
                student,
                amount,
                date,
                status
              }
            : payment
        );

      setPayments(updatedPayments);

      alert("Payment updated successfully!");

      setEditId(null);

    } else {

      const newPayment = {

        id: Date.now(),

        student,

        amount,

        date,

        status

      };

      setPayments([
        ...payments,
        newPayment
      ]);

      alert("Payment added successfully!");

    }


    clearForm();
  };


  // EDIT PAYMENT

  const handleEdit = (payment) => {

    setStudent(payment.student);

    setAmount(payment.amount);

    setDate(payment.date);

    setStatus(payment.status);

    setEditId(payment.id);

  };


  // DELETE PAYMENT

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this payment?"
      );

    if (!confirmDelete) {
      return;
    }

    const updatedPayments =
      payments.filter(
        (payment) =>
          payment.id !== id
      );

    setPayments(updatedPayments);

  };


  // CLEAR FORM

  const clearForm = () => {

    setStudent("");

    setAmount("");

    setDate("");

    setStatus("Paid");

    setEditId(null);

  };


  // TOTAL AMOUNT

  const totalAmount =
    payments.reduce(
      (total, payment) =>
        total + Number(payment.amount),
      0
    );


  return (

    <div className="payments-page">

      {/* HEADER */}

      <div className="payments-header">

        <div>

          <h1>
            Payments
          </h1>

          <p>
            Manage academy student payments
          </p>

        </div>

        <div className="total-payment">

          <span>
            Total Collection
          </span>

          <strong>
            ₹{totalAmount}
          </strong>

        </div>

      </div>


      {/* PAYMENT FORM */}

      <div className="payment-form-card">

        <h2>
          {editId !== null
            ? "Update Payment"
            : "Add Payment"
          }
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <div className="payment-form-grid">

            {/* STUDENT */}

            <div className="payment-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter student name"
                value={student}
                onChange={(e) =>
                  setStudent(
                    e.target.value
                  )
                }
              />

            </div>


            {/* AMOUNT */}

            <div className="payment-group">

              <label>
                Amount
              </label>

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
              />

            </div>


            {/* DATE */}

            <div className="payment-group">

              <label>
                Payment Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
              />

            </div>


            {/* STATUS */}

            <div className="payment-group">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >

                <option value="Paid">
                  Paid
                </option>

                <option value="Pending">
                  Pending
                </option>

              </select>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="payment-buttons">

            <button
              type="submit"
              className="add-payment-btn"
            >
              {editId !== null
                ? "Update Payment"
                : "Add Payment"
              }
            </button>

            <button
              type="button"
              className="clear-payment-btn"
              onClick={clearForm}
            >
              Clear
            </button>

          </div>

        </form>

      </div>


      {/* PAYMENT LIST */}

      <div className="payment-list-card">

        <h2>
          Payment Records
        </h2>

        {payments.length === 0 ? (

          <div className="no-payments">
            No payment records found.
          </div>

        ) : (

          <div className="payment-table-container">

            <table>

              <thead>

                <tr>

                  <th>
                    #
                  </th>

                  <th>
                    Student
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map(
                  (payment, index) => (

                    <tr
                      key={payment.id}
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {payment.student}
                      </td>

                      <td>
                        ₹{payment.amount}
                      </td>

                      <td>
                        {payment.date}
                      </td>

                      <td>

                        <span
                          className={
                            payment.status === "Paid"
                              ? "status-paid"
                              : "status-pending"
                          }
                        >
                          {payment.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="payment-edit-btn"
                          onClick={() =>
                            handleEdit(
                              payment
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="payment-delete-btn"
                          onClick={() =>
                            handleDelete(
                              payment.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Payments;