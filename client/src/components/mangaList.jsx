import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    color: '#BC002D',
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '30px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(188, 0, 45, 0.2)',
    borderBottom: '4px solid #BC002D',
    paddingBottom: '15px'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  thead: {
    backgroundColor: '#BC002D',
    color: 'white'
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    borderBottom: '3px solid #ffffff'
  },
  tr: {
    borderBottom: '1px solid #f0f0f0',
    transition: 'background-color 0.3s'
  },
  td: {
    padding: '15px',
    color: '#333'
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 'bold'
  },
  completedBadge: {
    backgroundColor: '#BC002D',
    color: 'white'
  },
  ongoingBadge: {
    backgroundColor: '#f0f0f0',
    color: '#BC002D',
    border: '2px solid #BC002D'
  },
  editButton: {
    backgroundColor: '#BC002D',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    marginRight: '10px',
    transition: 'background-color 0.3s',
    fontWeight: '500'
  },
  deleteButton: {
    backgroundColor: 'white',
    color: '#BC002D',
    border: '2px solid #BC002D',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500'
  }
};
 
const MangaRecord = (props) => (
  <tr style={styles.tr} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
    <td style={styles.td}><strong>{props.record.name}</strong></td>
    <td style={styles.td}>{props.record.author}</td>
    <td style={styles.td}>{props.record.originalRun}</td>
    <td style={styles.td}>
      <span style={{
        ...styles.badge,
        ...(props.record.completed ? styles.completedBadge : styles.ongoingBadge)
      }}>
        {props.record.completed ? '完' : '連載中'}
      </span>
    </td>
    <td style={styles.td}>
      <Link 
        style={styles.editButton}
        to={`/edit/${props.record._id}`}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#9a0024'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#BC002D'}
      >
        編集
      </Link>
      <button 
        style={styles.deleteButton}
        onClick={() => props.deleteRecord(props.record._id)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#BC002D';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = '#BC002D';
        }}
      >
        削除
      </button>
    </td>
  </tr>
);
 
export default function MangaList() {
  const [records, setRecords] = useState([]);
 
  // This method fetches the manga records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
 
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
 
      const records = await response.json();
      setRecords(records);
    }
 
    getRecords();
 
    return;
  }, [records.length]);
 
  // This method will delete a manga record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });
 
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }
 
  // This method will map out the manga records on the table
  function mangaList() {
    return records.map((record) => {
      return (
        <MangaRecord
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
 
  // This following section will display the table with the manga records.
  return (
    <div style={styles.container}>
      <h3 style={styles.header}>📚 漫画バックログ (Manga Backlog)</h3>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Original Run</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>{mangaList()}</tbody>
      </table>
    </div>
  );
}