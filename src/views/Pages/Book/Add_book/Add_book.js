import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Add_book(props) {
  const {
    show,
    setShow,
    handleShow,
    handleClose,
    bookDetail,
    setBookDetail,
    Handlesubmit,
    handleChange,
    error,
    bookPopup,
  } = props.bookProps;

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement='end'
      style={{ width: '40%' }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{`${bookPopup?.name} Book`}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form>
          <div class='form-group mb-2'>
            <label for='firstname'>Title</label>
            <input
              type='text'
              value={bookDetail?.title}
              name='title'
              onChange={(e) => handleChange(e)}
              class='form-control'
              id='firstname'
            />
            <small className='error_spot'>{error?.title}</small>
          </div>
          <div class='form-group mb-2'>
            <label for='lastname'>Author</label>
            <input
              type='text'
              class='form-control'
              id='lastname'
              value={bookDetail?.author}
              name='author'
              onChange={(e) => handleChange(e)}
            />
            <small className='error_spot'>{error?.author}</small>
          </div>
          <div class='form-group mb-2'>
            <label for='mailid'>Quanity</label>
            <input
              type='text'
              class='form-control'
              id='mailid'
              value={bookDetail?.quantity}
              name='quantity'
              onChange={(e) => handleChange(e)}
            />
            <small className='error_spot'>{error?.quantity}</small>
          </div>
          <div class='form-group mb-2'>
            <label for='phoneno'>Rent Fee</label>
            <input
              type='text'
              class='form-control'
              id='phoneno'
              value={bookDetail?.rentfee}
              name='rentfee'
              onChange={(e) => handleChange(e)}
            />
            <small className='error_spot'>{error?.rentfee}</small>
          </div>
        </form>
      </Offcanvas.Body>
      <div className='offcanvas-footer'>
        <div className='btns'>
          <Button variant='danger' onClick={() => setShow(true)}>
            Cancel
          </Button>
          <Button variant='secondary ms-4' onClick={(e) => Handlesubmit(e)}>
            {bookPopup?.name}
          </Button>
        </div>
      </div>
    </Offcanvas>
  );
}

export default Add_book;
