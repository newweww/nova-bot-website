import React, { useState, useEffect } from 'react';
import './style.css';

const Question = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className='dark-mode screen'>
      <div>
        <div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Username</th>
                <th scope="col">Question</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.userName}</td>
                  <td>{item.question}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Question;
