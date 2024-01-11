import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Alertpopup.css';

function Alertpopup(props) {
  const { alert, setAlert, DeleteBook } = props.Deleteprops;

  return (
    <Modal show={alert} onHide={() => setAlert(false)} className='delete_popup'>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete ?</Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={() => setAlert(false)}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={(e) => DeleteBook(e)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Alertpopup;
