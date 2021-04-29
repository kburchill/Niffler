import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const EditTransactionForm = () => {
    const [errors, setErrors] = useState([]);
    const [groupId, setGroupId] = useState(1);
    const [description, setDescription] = useState("");
    const [debtors, setDebtors] = useState([]);
    const [payerId, setPayerId] = useState(1);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState();
    const [completed, setCompleted] = useState(false)

    const { transactionId } = useParams();

    const onSubmit = async (e) => {
        e.preventDefault();
        // Temporary fetch - use session thunk in finished version.
        const response = await fetch(`/api/expenses/${transactionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "group_id": groupId,
                "expense_date": date,
                "payer_id": payerId,
                description,
                debtors,
                amount,
                completed
            })
        });
    }

    const updateGroup = (e) => {
        setGroupId(parseInt(e.target.value));
    }

    const updateDescription = (e) => {
        setDescription(e.target.value);
    }

    const updateDebtors = (e) => {
        const options = e.target.options;
        const values = []
        for (var i = 0; i < options.length; i++) {
            if (options.item(i).selected) values.push(options.item(i).value);
        }
        setDebtors(values);
    }

    const updatePayerId = (e) => {
        setPayerId(parseInt(e.target.value));
    }

    const updateAmount = (e) => {
        setAmount(parseInt(e.target.value));
    }

    const updateDate = (e) => {
        setDate(e.target.value);
    }
    
    const updateCompleted = (e) => {
        setCompleted(e.target.checked);
    }

    return (
        <form onSubmit={onSubmit} id='new-transaction-form'>
            <div>
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor="groups">Select a group.</label>
                {/* These are temporary groups. Finished version will dynamically get current user's groups from store. */}
                <select onChange={updateGroup} value={groupId}>
                    <option value="1">Gryffindor</option>
                    <option value="2">Ravenclaw</option>
                    <option value="3">Hufflepuff</option>
                    <option value="4">Slytherin</option>
                </select>
            </div>
            <div>
                <label htmlFor="description">What is this for?</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={updateDescription}
                />
            </div>
            <div>
                <label htmlFor="payer">Which group member paid?</label>
                {/* These are temporary users. Finished version will dynamically get users belonging to group from store. */}
                <select onChange={updatePayerId} value={payerId}>
                    <option value="1">Demolition</option>
                    <option value="2">Harry</option>
                    <option value="3">Hermione</option>
                    <option value="4">Ronald</option>
                </select>
            </div>
            <div>
                <label htmlFor="amount">How much?</label>
                <input
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={updateAmount}
                />
            </div>
            <div>
                <label htmlFor="users">Which group members owe money?</label>
                {/* These are temporary users. Finished version will dynamically get users belonging to group from store. */}
                <select multiple={true} onChange={updateDebtors}>
                    <option value="1">Demolition</option>
                    <option value="2">Harry</option>
                    <option value="3">Hermione</option>
                    <option value="4">Ronald</option>
                </select>
            </div>
            <div>
                <label htmlFor="date">When did this transaction occur?</label>
                <input
                    name="date"
                    type="date"
                    value={date}
                    onChange={updateDate}
                />
            </div>
            <div>
                <label htmlFor="completed">Is this transaction settled?</label>
                <input
                    name="completed"
                    type="checkbox"
                    checked={completed}
                    onChange={updateCompleted}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}
export default EditTransactionForm;