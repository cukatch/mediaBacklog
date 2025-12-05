import React, { useState } from "react";
import { useNavigate } from "react-router";

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
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   author: "",
   originalRun: "",
   completed: false,
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new manga to the database.
   const newManga = { ...form };
 
   await fetch("http://localhost:5000/manga", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newManga),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", author: "", originalRun: "", completed: false });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div style={styles.container}>
     <h3 style={styles.header}>📚 Add New Manga</h3>
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
           value="追加 (Add Manga)"
           style={styles.submitButton}
           onMouseEnter={(e) => e.target.style.backgroundColor = '#9a0024'}
           onMouseLeave={(e) => e.target.style.backgroundColor = '#BC002D'}
         />
       </div>
     </form>
   </div>
 );
}