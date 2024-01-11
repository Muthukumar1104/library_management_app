import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Add_member_Details(props) {
  const {
    show,
    setShow,
    handleShow,
    handleClose,
    memeberDetail,
    setMemberDetail,
    Handlesubmit,
    handleChange,
    error,
    memberPopup,
  } = props.memberProps;

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement='end'
      style={{ width: '40%' }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{`${memberPopup?.name} Member`}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form>
          <div class='form-group mb-2'>
            <label for='firstname'>Name</label>
            <input
              type='text'
              value={memeberDetail?.name}
              name='name'
              onChange={(e) => handleChange(e)}
              class='form-control'
              id='firstname'
            />
            <small className='error_spot'>{error?.name}</small>
          </div>
          <div class='form-group mb-2'>
            <label for='lastname'>Mobile Number</label>
            <input
              type='text'
              class='form-control'
              id='lastname'
              value={memeberDetail?.mobile}
              name='mobile'
              onChange={(e) => handleChange(e)}
            />
            <small className='error_spot'>{error?.mobile}</small>
          </div>
          <div class='form-group mb-2'>
            <label for='mailid'>Address</label>
            <textarea
              type='text'
              class='form-control'
              id='mailid'
              value={memeberDetail?.address}
              name='address'
              rows={5}
              onChange={(e) => handleChange(e)}
              style={{ resize: 'none' }}
            />
            <small className='error_spot'>{error?.address}</small>
          </div>
        </form>
      </Offcanvas.Body>
      <div className='offcanvas-footer'>
        <div className='btns'>
          <Button variant='danger' onClick={() => setShow(true)}>
            Cancel
          </Button>
          <Button variant='secondary ms-4' onClick={(e) => Handlesubmit(e)}>
            {memberPopup?.name}
          </Button>
        </div>
      </div>
    </Offcanvas>
  );
}

export default Add_member_Details;
