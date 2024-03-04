import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/notes')
      .then(response => setNotes(response.data));
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      title: newTitle,
      content: newNote,
    };

    axios.post('http://localhost:3000/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data));
        setNewTitle('');
        setNewNote('');
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Note</h2>
      <form onSubmit={addNote}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="3"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save Note</button>
      </form>
      <div className="mt-5">
        <h3>Notes</h3>
        {notes.map(note => (
          <div key={note._id} className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
