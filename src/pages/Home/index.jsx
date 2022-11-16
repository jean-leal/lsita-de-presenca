import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card } from '../../componets/Card';

export function Home() {
  const [studentName, setStudentName] = useState();
  const [studets, setStudents] = useState([]);
  const [user, setUser] = useState({name:'', avatar:''});

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }
 
  useEffect(()=>{
    // corpo do useEffect
    fetch('https://api.github.com/users/jean-leal')
      .then(res => res.json())
      .then(data =>{
        setUser({
          avatar: data.avatar_url, 
          name: data.name,
        })
      })

  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil " />
        </div>
      </header>
      
      <input 
        type='text' 
        placeholder="Digite o nome..." 
        onChange={e => setStudentName(e.target.value)}
      />
      <button type='button' onClick={handleAddStudent}>
        Adicionar
      </button>

    {
      studets.map(student => (
      <Card
      key={student.time}
      name={student.name} 
      time={student.time}/>
      ))      
    }
  
    </div>
  );
}
