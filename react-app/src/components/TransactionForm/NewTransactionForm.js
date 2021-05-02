import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { addGroupTransaction, groupData } from "../../store/groups"

import "./TransactionForm.css"

const NewTransactionForm = () => {
    const [errors, setErrors] = useState([]);
    const [groupId, setGroupId] = useState(1);
    const [description, setDescription] = useState("");
    const [debtors, setDebtors] = useState([]);
    const [payerId, setPayerId] = useState(1);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState();

    const dispatch = useDispatch();

    const groupUsers = useSelector(state => state.groups.users);
    const userGroups = useSelector(state => state.userData.groups);
    const currentUser = useSelector(state => state.session);

    useEffect(() => {
        dispatch(groupData(groupId));
    }, [groupId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        // Temporary fetch - use session thunk in finished version.
        const response = await fetch('/api/expenses/', {
            method: 'POST',
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
                groupUsers
            })
        });
        if (response.ok) {
            dispatch(addGroupTransaction(response));
            window.location.reload()
        }
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
        console.log(values, groupUsers, "DEBTOR INFO HERE")
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

    return (
        <form onSubmit={onSubmit} id='new-transaction-form'>
            <div>
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
            </div>
            <div id="close-new-transaction-form">X</div>
            <div>
                <label htmlFor="groups">Select a group.</label>
                <select onChange={updateGroup} value={groupId}>
                    {userGroups && Object.entries(userGroups).map(([group_id, group_name]) => (
                        <option key={group_id} value={group_id}>{group_name}</option>
                    ))}
                </select>
            </div>
            <div className="new-description">
                <label htmlFor="description">What is this for?</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={updateDescription}
                />
            </div>
            <div>
                <label htmlFor="payer">Which group member paid?</label>
                <select onChange={updatePayerId} value={payerId}>
                    {groupUsers && Object.values(groupUsers).map(user => (
                        <option key={user.user_id} value={user.user_id}>
                            {user.first_name + " " + user.last_name}
                        </option>
                    ))}
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
            <div className="new-debtors">
                <label htmlFor="users">Which group members owe money?</label>
                {/* These are temporary users. Finished version will dynamically get users belonging to group from store. */}
                <select multiple={true} onChange={updateDebtors}>
                    {groupUsers && Object.values(groupUsers).map(user => (
                        (user.user_id !== payerId) && <option key={user.user_id} value={user.user_id}>
                            {user.first_name + " " + user.last_name}
                        </option>
                    ))}
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
            <button className="new-transaction-submit"type="submit">Submit</button>
        </form>
    );
}
export default NewTransactionForm;
