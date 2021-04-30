import React, { useState, useEffect } from 'react';
import CreateGroupForm from "./CreateGroupForm"

const CreateGroupButton = () => {
    const [showNewGroupForm, setShowNewGroupForm] = useState(false);

    const openNewGroupForm = () => {
        if (showNewGroupForm) return;
        setShowNewGroupForm(true);
    };

    useEffect(() => {
        if (!showNewGroupForm) return;

        const closeNewGroupForm = () => {
            setShowNewGroupForm(false);
        };


        // document.addEventListener('click', closeNewTransactionForm);
        document.getElementById("close-new-group-form").addEventListener('click', closeNewGroupForm);

        // return () => document.getElementById("close-new-transaction-form").addEventListener('click', closeNewTransactionForm);
    }, [showNewGroupForm]);

    return (
        <>
            <button onClick={openNewGroupForm}>
                Add Group
            </button>
            {showNewGroupForm && <CreateGroupForm />}
        </>
    )
}

export default CreateGroupButton;