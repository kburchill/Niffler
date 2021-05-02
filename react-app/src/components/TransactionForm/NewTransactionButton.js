import React, { useState, useEffect } from 'react';
import NewTransactionForm from "./NewTransactionForm"

const NewTransactionButton = () => {
    const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);

    const openNewTransactionForm = () => {
        if (showNewTransactionForm) return;
        setShowNewTransactionForm(true);
    };

    useEffect(() => {
        if (!showNewTransactionForm) return;

        const closeNewTransactionForm = () => {
            setShowNewTransactionForm(false);
        };


        document.addEventListener('submit', closeNewTransactionForm);
        document.getElementById("close-new-transaction-form").addEventListener('click', closeNewTransactionForm);

        // return () => document.getElementById("close-new-transaction-form").addEventListener('click', closeNewTransactionForm);
    }, [showNewTransactionForm]);

    return (
        <>
            <button className="dashboard__top-banner__add-button"
                onClick={openNewTransactionForm}>
                Add Expense
            </button>
            {showNewTransactionForm && <NewTransactionForm />}
        </>
    )
}

export default NewTransactionButton;
