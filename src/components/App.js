import React, { useRef, useState } from 'react';
import './../styles/App.css';

const data = [
  {
    id: 1,
    name: 'Ash',
    age: '24',
  },
  {
    id: 2,
    name: 'Misty',
    age: '25',
  },
  {
    id: 3,
    name: 'Brock',
    age: '26',
  },
  {
    id: 4,
    name: 'Naruto',
    age: '20',
  },
  {
    id: 5,
    name: 'Asta',
    age: '14',
  },
  {
    id: 6,
    name: 'Sung jinwo',
    age: '22',
  },
];

const App = () => {
  const [tableData, setTableData] = useState(data);
  const editedRowsRef = useRef({});
  const columns =
    tableData.length > 0
      ? Object.keys(tableData[0]).filter((key) => key !== 'id')
      : [];

  const handleInputChange = (rowIndex, fieldName, value) => {
    if (!editedRowsRef.current[rowIndex]) {
      editedRowsRef.current[rowIndex] = { ...tableData[rowIndex] };
    }
    editedRowsRef.current[rowIndex][fieldName] = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedRows = editedRowsRef.current;

    const updateData = tableData.map((row, index) => {
      return editedRows[index] ? editedRows[index] : row;
    });

    setTableData(updateData);

    const editedIndexes = Object.keys(editedRows).map(Number);

    console.log('edited:', editedIndexes);
  };
  return (
    <div>
      <h2>Track edited cell to log updates for future</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>AGE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {columns.map((col) => (
                  <td key={col}>
                    <input
                      type={col === 'age' ? 'number' : 'text'}
                      defaultValue={item[col]}
                      onChange={(e) =>
                        handleInputChange(rowIndex, col, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button>Save All Changes</button>
      </form>
    </div>
  );
};

export default App;
