import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

const Question = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});

  const itemsPerPage = 10;

  const fetchData = () => {
    fetch('https://nova-api-ih4v.onrender.com/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const currentTime = new Date();
  const formattedTime = currentTime.toString();
  const dateTimeParts = formattedTime.split(' GMT')[0];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCheckedItems({});
  };

  const handleDelete = async (_id) => {
    try {
      const fetchDataResponse = await axios.get(`https://nova-api-ih4v.onrender.com/api/data/${_id}`);
      console.log("Data to delete:", fetchDataResponse.data);
      const dataToDelete = fetchDataResponse.data;

      const { guildId, userId, userName, question, time } = dataToDelete;

      const postData = { guildId, userId, userName, question, time, del_time: dateTimeParts};

      console.log("Data to post:", postData);

      await axios.post('https://nova-api-ih4v.onrender.com/api/questions', postData);

      const deleteResponse = await axios.delete(`https://nova-api-ih4v.onrender.com/api/questions/${_id}`);

      if (deleteResponse.status === 200) {
        fetchData();
      } else {
        console.log(deleteResponse);
        console.log(_id);
        throw new Error('Failed to delete the item');
      }
    } catch (error) {
      console.log(error);
    }
  };



  const toggleCheckbox = (index) => {
    setCheckedItems({ ...checkedItems, [index]: !checkedItems[index] });
  };

  return (
    <div className='dark-mode screen'>
      <div style={{ height: '90vh' }}>
        <div>
          <h1>Questions</h1>
        </div>
        <div>
          <table className="table table-dark table-striped table-hover" style={{ width: '120vh' }}>
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">No.</th>
                <th scope="col">Username</th>
                <th scope="col">Question</th>
                <th scope="col">Time</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {currentItems.map((item, index) => (
                <tr key={index} style={{ opacity: checkedItems[index] ? 0.5 : 1 }}>
                  <td>
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={checkedItems[index]}
                      onChange={() => toggleCheckbox(index)}
                    />
                  </td>
                  <th scope="row">{indexOfFirstItem + index + 1}</th>
                  <td>{item.userName}</td>
                  <td>{item.question}</td>
                  <td>{item.time}</td>
                  <td>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                  <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Question;
