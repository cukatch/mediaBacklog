import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  header: {
    color: '#BC002D',
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '30px',
    fontWeight: 'bold',
    borderBottom: '3px solid #BC002D',
    paddingBottom: '10px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#BC002D',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color 0.3s'
  },
  checkbox: {
    marginRight: '8px',
    width: '18px',
    height: '18px',
    accentColor: '#BC002D'
  },
  checkboxLabel: {
    color: '#333',
    fontSize: '1rem'
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#BC002D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};
 
export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   author: "",
   originalRun: "",
   completed: false,
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/manga/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const manga = await response.json();
     if (!manga) {
       window.alert(`Manga with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(manga);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedManga = {
     name: form.name,
     author: form.author,
     originalRun: form.originalRun,
     completed: form.completed,
   };
 
   // This will send a PUT request to update the manga in the database.
   await fetch(`http://localhost:5000/manga/${params.id}`, {
     method: "PUT",
     body: JSON.stringify(editedManga),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div style={styles.container}>
     <h3 style={styles.header}>✏️ Edit Manga</h3>
     <form onSubmit={onSubmit}>
       <div style={styles.formGroup}>
         <label htmlFor="name" style={styles.label}>Manga Title</label>
         <input
           type="text"
           style={styles.input}
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
           onFocus={(e) => e.target.style.borderColor = '#BC002D'}
           onBlur={(e) => e.target.style.borderColor = '#ddd'}
           required
         />
       </div>
       <div style={styles.formGroup}>
         <label htmlFor="author" style={styles.label}>Author</label>
         <input
           type="text"
           style={styles.input}
           id="author"
           value={form.author}
           onChange={(e) => updateForm({ author: e.target.value })}
           onFocus={(e) => e.target.style.borderColor = '#BC002D'}
           onBlur={(e) => e.target.style.borderColor = '#ddd'}
           required
         />
       </div>
       <div style={styles.formGroup}>
         <label htmlFor="originalRun" style={styles.label}>Original Run</label>
         <input
           type="text"
           style={styles.input}
           id="originalRun"
           placeholder="e.g., 2015-2020"
           value={form.originalRun}
           onChange={(e) => updateForm({ originalRun: e.target.value })}
           onFocus={(e) => e.target.style.borderColor = '#BC002D'}
           onBlur={(e) => e.target.style.borderColor = '#ddd'}
           required
         />
       </div>
       <div style={styles.formGroup}>
         <label style={styles.checkboxLabel}>
           <input
             type="checkbox"
             style={styles.checkbox}
             checked={form.completed}
             onChange={(e) => updateForm({ completed: e.target.checked })}
           />
           Completed (完)
         </label>
       </div>
       <div style={styles.formGroup}>
         <input
           type="submit"
           value="更新 (Update Manga)"
           style={styles.submitButton}
           onMouseEnter={(e) => e.target.style.backgroundColor = '#9a0024'}
           onMouseLeave={(e) => e.target.style.backgroundColor = '#BC002D'}
         />
       </div>
     </form>
   </div>
 );
}