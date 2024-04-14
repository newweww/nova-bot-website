import React, { useState, useEffect } from 'react';
import './style.css';

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCheckedItems({}); 
  };

  const handleDelete = (_id) => {
    fetch(`https://nova-api-ih4v.onrender.com/api/data/${_id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        fetchData();
      } else {
        throw new Error('Failed to delete the item');
      }
    })
    .catch(error => console.log(error));
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
