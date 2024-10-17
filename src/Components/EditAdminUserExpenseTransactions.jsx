import React from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';


const EditAdminUserExpenseTransactions = ({ selectedUsers,
    setSelectedUsers,
    userExpenseTransactions,
    setUserExpenseTransactions,
    setEditUserExpenseInfoIsOpen,
    handleEditClick,
    editUserExpenseIsOpen
}) => {
    return (
        <div>
            <Offcanvas toggle={handleEditClick}
                isOpen={editUserExpenseIsOpen}
                direction="start">

                <OffcanvasHeader toggle={handleEditClick}>
                    Offcanvas
                </OffcanvasHeader>
                <OffcanvasBody>
                    <strong>
                        This is the Offcanvas body.
                    </strong>
                </OffcanvasBody>
            </Offcanvas>
        </div>

    )
}

export default EditAdminUserExpenseTransactions
