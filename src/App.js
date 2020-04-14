import React, {useEffect, useState }  from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  const [title, setTitle] =  useState("");
  const [url, setUrl] =  useState("");
  const [techs, setTechs] =  useState([]);


  useEffect(() => {
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    //setTechs(techs.split('\n'));

    const response = await api.post('repositories', {
      title : title,
      url: url,
      techs: techs
    })

    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(() =>{
      setRepositories(repositories.filter(
        repository => repository.id != id
      ))
    }).catch(() => {
      alert("erro remove repository")
    });

    
  }

  return (
    <div>
      <div className="add-repository">
        <label>Title:</label>
          <input value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
          <label>Url:</label>
          <input value={url} onChange={(e) => {setUrl(e.target.value)}}></input>
          <label>Techs separado por virgula:</label>
          <input value={techs} onChange={(e) => {setTechs(e.target.value)}}></input>
 
          <button onClick={handleAddRepository}>Adicionar</button>
      </div>

      <div class="table-title">  
          <p>Repositórios</p>  
      </div>  
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => (
            <div className="list-repository" key={repository.id}>
              <li >
                <div class="Row">  
                  <div class="table-cell">  
                      <p>  {repository.title} </p>
                  </div>
                  <div class="table-cell">  
                      <p>  {repository.url} </p>
                  </div>
                  <div class="table-cell">  
                      <p>  {repository.techs} </p>
                  </div>
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
