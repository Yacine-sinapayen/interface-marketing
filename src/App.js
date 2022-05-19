import Navbar from './Components/Navbar/Navbar';
import Action from './Pages/Action/Action';
import AddAction from './Pages/AddAction/AddAction';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  
// Récupéartion de toues les actions
  const fetchData = async () => {
    await fetch('https://squedio.com/marketing/api/v1/actions')
      .then((response) => response.json())
      .then((data) => setActions(data))
      .catch((err) => {
        console.log(err);
      })
  };

  // Ajout d'une action
  const onAdd = async (title, media, tags, target_url) => {
    await fetch('https://squedio.com/marketing/api/v1/actions', {
      method: 'POST',
      body: JSON.stringify({
        id:uuidv4(),
        title: title,
        media: media,
        tags: tags,
        target_url: target_url
      }),
      headers: {
        "Content-type": "application/json; charset=UTF+8",
      }
    })
      .then((res) => {
        if (res.status !== 201) {
          return
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setActions((actions) => [...actions, data]);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Action actions={actions} setActions={setActions} />} />
        <Route path='/nouvelle-action' element={<AddAction actions={actions} setActions={setActions} onAdd={onAdd} />} />
      </Routes>
    </>
  );
}

export default App;
