import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './All_book.css';
import Add_Books from '../Add_book/Add_book';
import Alertpopup from '../../../Base/Delete_popup/Delete_popup';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../../Axios/Axios';
import AppContext from '../../../../Components/Context/Appcontext';

const All_book = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [alert, setAlert] = useState(false);

  const { user } = useContext(AppContext);

  //Get book list
  const [currentPage, setCurrentPage] = useState(1);
  const [bookList, setBookList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Axios({
      url: `/crm/book?title=${search}&author=${search}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${user?.loginfo?.data?.token}`,
      },
    }).then((res) => {
      if (res?.status == 200) {
        setBookList(res?.data?.data?.data);
        // console.log('sdjfkjsdfjd', res?.data?.data?.data);
      }
    });
  }, [flag, search]);

  //Add and update Book
  const [editID, setEditID] = useState('');
  const [bookPopup, setBookPopup] = useState({ name: 'Add' });

  //Initial state
  const InitialState = !editID
    ? {
        title: '',
        author: '',
        quantity: '',
        rentfee: '',
      }
    : {
        id: '',
        title: '',
        author: '',
        quantity: '',
        rentfee: '',
      };

  const [bookDetail, setBookDetail] = useState(InitialState);

  //Edit book detils
  const EditBook = (id) => {
    setBookPopup({ name: 'Update' });
    setEditID(id);
    setShow(true);
    Axios({
      url: `/crm/book/${id}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${user?.loginfo?.data?.token}`,
      },
    }).then((res) => {
      if (res?.status == 200) {
        setBookDetail({
          ...bookDetail,
          ...res?.data?.data,
          id: res?.data?.data?._id,
        });
      }
    });
  };

  //Onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetail({ ...bookDetail, [name]: value });
    if (name == 'quantity') {
      setBookDetail({ ...bookDetail, quantity: value?.replace(/\D/g, '') });
    } else if (name == 'rentfee') {
      setBookDetail({ ...bookDetail, rentfee: value?.replace(/\D/g, '') });
    }
  };

  //Signup API
  const [error, setError] = useState({}); //Error handling
  const navigate = useNavigate(); //Route the location to another page

  const Handlesubmit = (e) => {
    e.preventDefault();
    const url = !editID ? `/crm/book` : `/crm/book/update`;
    const payload = !editID
      ? {
          title: bookDetail?.title,
          author: bookDetail?.author,
          quantity: bookDetail?.quantity,
          rentfee: bookDetail?.rentfee,
        }
      : {
          id: bookDetail?.id,
          title: bookDetail?.title,
          author: bookDetail?.author,
          quantity: bookDetail?.quantity,
          rentfee: bookDetail?.rentfee,
        };

    const Successmsg = !editID
      ? 'Book added successfully!'
      : 'Book updated successfully!';

    Axios({
      url: url,
      method: 'post',
      headers: {
        Authorization: `Bearer ${user?.loginfo?.data?.token}`,
      },
      data: payload,
    })
      .then((res) => {
        console.log('nook', res);
        if (res?.status == 200) {
          setShow(false);
          setError({});
          setBookList(InitialState);
          setFlag(!flag);
          alert(Successmsg);
        }
      })
      .catch((err) => {
        if (err?.response?.status == 422) {
          const err_details = err?.response?.data?.errors.reduce(
            (acc, error) => {
              return { ...acc, ...error };
            },
            {}
          );
          setError(err_details);
        }
      });
  };

  //Delete API
  const [deleteID, setDeleteID] = useState('');
  const DeleteBook = (e) => {
    e.preventDefault();
    if (deleteID) {
      Axios({
        url: `/crm/book/delete/${deleteID}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${user?.loginfo?.data?.token}`,
        },
      }).then((res) => {
        if (res?.status == 200) {
          setAlert(false);
          // alert('Book detail deleted successfully!');
          setFlag(!flag);
        }
      });
    }
  };

  //props
  const bookProps = {
    show: show,
    setShow: setShow,
    handleClose: handleClose,
    handleShow: handleShow,
    bookDetail: bookDetail,
    setBookDetail: setBookDetail,
    Handlesubmit: Handlesubmit,
    handleChange: handleChange,
    error: error,
    bookPopup: bookPopup,
  };

  //delete props
  const Deleteprops = {
    alert: alert,
    setAlert: setAlert,
    DeleteBook: DeleteBook,
  };

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = bookList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(bookList.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='All_contacts'>
      <Card>
        <Card.Body>
          <Card.Title>
            <div className='title'>
              <h3>Book List</h3>
            </div>
            <div className='actions'>
              <input
                type='text'
                className='search me-4'
                value={search}
                name='search'
                placeholder='Search Books...'
                autoComplete='off'
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant='danger'
                onClick={() => {
                  setBookDetail({});
                  setBookPopup({ name: 'Add' });
                  setShow(true);
                }}
              >
                Add Book
              </Button>
            </div>
          </Card.Title>
          <Card.Text>
            <div class='table-responsive'>
              <table class='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col'>S.No</th>
                    <th scope='col'>Book Name</th>
                    <th scope='col'>Author</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Rent fee</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(bookList) &&
                    bookList?.map((book, i) => (
                      <tr>
                        <th scope='row'>{i + 1}</th>
                        <td>{book?.title}</td>
                        <td>{book?.author}</td>
                        <td>{book?.quantity}</td>
                        <td>{book?.rentfee}</td>
                        <td>
                          <div className='d-flex align-items-center justify-content-start'>
                            <i
                              class='bi bi-pencil-square me-3'
                              onClick={() => EditBook(book?._id)}
                            />
                            <i
                              class='bi bi-trash3'
                              onClick={() => {
                                setDeleteID(book?._id);
                                setAlert(true);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='pagination'>
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Add_Books bookProps={bookProps} />
      <Alertpopup Deleteprops={Deleteprops} />
    </div>
  );
};

export default All_book;
