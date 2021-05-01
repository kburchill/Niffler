import React, { useState, useEffect } from 'react';
import EditTransactionForm from "./EditTransactionForm"

const EditTransactionButton = () => {
    const [showEditTransactionForm, setShowEditTransactionForm] = useState(false);

    const openEditTransactionForm = () => {
        if (showEditTransactionForm) return;
        setShowEditTransactionForm(true);
    };

    useEffect(() => {
        if (!showEditTransactionForm) return;

        const closeEditTransactionForm = () => {
            setShowEditTransactionForm(false);
        };


        // document.addEventListener('click', closeEditTransactionForm);
        document.getElementById("close-Edit-transaction-form").addEventListener('click', closeEditTransactionForm);

        // return () => document.getElementById("close-Edit-transaction-form").addEventListener('click', closeEditTransactionForm);
    }, [showEditTransactionForm]);

    return (
        <>
            <button className="edit-transaction-button" onClick={openEditTransactionForm}>
                Edit Expense
            </button>
            {showEditTransactionForm && <EditTransactionForm />}
        </>
    )
}

export default EditTransactionButton;
