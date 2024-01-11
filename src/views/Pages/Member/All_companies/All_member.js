import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './All_member.css';
import Add_member_Details from '../Add_companies/Add_member';
import Alertpopup from '../../../Base/Delete_popup/Delete_popup';
import Axios from '../../../../Axios/Axios';
import AppContext from '../../../../Components/Context/Appcontext';
import { useNavigate } from 'react-router-dom';

const All_member = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [alert, setAlert] = useState(false);

  const { user } = useContext(AppContext);

  //Get book list
  const [currentPage, setCurrentPage] = useState(1);
  const [membersList, setMembersList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Axios({
      url: `/crm/member?name=${search}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${user?.loginfo?.data?.token}`,
      },
    }).then((res) => {
      if (res?.status == 200) {
        setMembersList(res?.data?.data?.data);
        // console.log('sdjfkjsdfjd', res?.data?.data?.data);
      }
    });
  }, [flag, search]);

  //Add and update Book
  const [editID, setEditID] = useState('');
  const [memberPopup, setMemberPopup] = useState({ name: 'Add' });

  //Initial state
  const InitialState = !editID
    ? {
        name: '',
        mobile: '',
        address: '',
      }
    : {
        id: '',
        name: '',
        mobile: '',
        address: '',
      };

  const [memeberDetail, setMemberDetail] = useState(InitialState);

  //Edit book detils
  const EditMember = (id) => {
    setMemberPopup({ name: 'Update' });
    setEditID(id);
    setShow(true);
    Axios({
      url: `/crm/member/${id}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${user?.loginfo?.data?.token}`,
      },
    }).then((res) => {
      if (res?.status == 200) {
        setMemberDetail({
          ...memeberDetail,
          ...res?.data?.data,
          id: res?.data?.data?._id,
        });
      }
    });
  };

  //Onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberDetail({ ...memeberDetail, [name]: value });
    if (name == 'mobile') {
      setMemberDetail({
        ...memeberDetail,
        mobile: value?.replace(/\D/g, ''),
      });
    }
  };

  //Signup API
  const [error, setError] = useState({}); //Error handling

  const Handlesubmit = (e) => {
    e.preventDefault();
    const url = !editID ? `/crm/member` : `/crm/member/update`;
    const payload = !editID
      ? {
          name: memeberDetail?.name,
          mobile: memeberDetail?.mobile,
          address: memeberDetail?.address,
        }
      : {
          id: memeberDetail?.id,
          name: memeberDetail?.name,
          mobile: memeberDetail?.mobile,
          address: memeberDetail?.address,
        };

    const Successmsg = !editID
      ? 'Member added successfully!'
      : 'Member updated successfully!';

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
          setMemberDetail(InitialState);
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
  const memberProps = {
    show: show,
    setShow: setShow,
    handleClose: handleClose,
    handleShow: handleShow,
    memeberDetail: memeberDetail,
    setMemberDetail: setMemberDetail,
    Handlesubmit: Handlesubmit,
    handleChange: handleChange,
    error: error,
    memberPopup: memberPopup,
  };

  //delete props
  const Deleteprops = {
    alert: alert,
    setAlert: setAlert,
    DeleteBook: DeleteBook,
  };

  console.log('mmmeee', memeberDetail);

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = membersList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(membersList.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='All_companies'>
      <Card>
        <Card.Body>
          <Card.Title>
            <div className='title'>
              <h3>Members List</h3>
            </div>
            <div className='actions'>
              <input
                type='text'
                className='search me-4'
                value={search}
                name='search'
                placeholder='Search Member...'
                autoComplete='off'
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant='danger'
                onClick={() => {
                  setMemberDetail({});
                  setMemberPopup({ name: 'Add' });
                  setShow(true);
                }}
              >
                Add Member
              </Button>
            </div>
          </Card.Title>
          <Card.Text>
            <div class='table-responsive'>
              <table class='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col'>S.No</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Mobile</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(currentMembers) &&
                    currentMembers?.map((member, i) => (
                      <tr>
                        <th scope='row'>{i + 1}</th>
                        <td>{member?.name}</td>
                        <td>{member?.mobile}</td>
                        <td>{member?.address}</td>
                        <td>
                          <div className='d-flex align-items-center justify-content-start'>
                            <i
                              class='bi bi-pencil-square me-3'
                              onClick={() => EditMember(member?._id)}
                            />
                            <i
                              class='bi bi-trash3'
                              onClick={() => {
                                setDeleteID(member?._id);
                                setAlert(true);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Add_member_Details memberProps={memberProps} />
      <Alertpopup Deleteprops={Deleteprops} />
    </div>
  );
};

export default All_member;
