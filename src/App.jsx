import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dataEmissao, setDataEmissao] = useState('');
  const [dataRecebimento, setDataRecebimento] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cnpjCreate, setCnpjCreate] = useState('');
  const [message, setMessage] = useState(null);
  const [created, setcreated] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost/nota-fiscal/'+cnpj)
      if (response.data.message.id){
        setMessage(`Sua nota fiscal ${response.data.message.id}: Emitida em: ${response.data.message.data_emissao},  Recebida em: ${response.data.message.data_recebimento} no CNPJ ${response.data.message.cnpj}`)
      } else {
        setMessage(response.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost/nota-fiscal', {
        data_emissao: dataEmissao,
        data_recebimento: dataRecebimento,
        cnpj: cnpjCreate
      });
      if (response.data.message.id){
        setcreated("Criado com sucesso. Sua chave: "+response.data.message.id)
      } else {
        setcreated(response.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div style={{ marginBottom: '120px' }}>
        <h2>Validador de CNPJ</h2>
        <form onSubmit={handleSubmit}>
          <input style={{ margin: '5px' }} type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Digite o CNPJ" />
          <button type="submit">Validar CNPJ</button>
          {message !== null ? <p>{message}</p> : <></>}
        </form>
      </div>
     
      <div>
        <h2>Inserir nova nota</h2>
        <form onSubmit={handleSubmitPost}>
          <div>
            <label htmlFor="dataEmissao">Data de Emissão:</label>
            <input style={{ margin: '5px' }} type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} id="dataEmissao" required />
          </div>
          <div>
            <label htmlFor="dataRecebimento">Data de Recebimento:</label>
            <input style={{ margin: '5px' }} type="date" value={dataRecebimento} onChange={(e) => setDataRecebimento(e.target.value)} id="dataRecebimento" required />
          </div>
          <div>
            <label htmlFor="cnpjCreate">CNPJ:</label>
            <input style={{ margin: '5px' }} type="number" value={cnpjCreate} onChange={(e) => setCnpjCreate(e.target.value)} id="cnpjCreate" required />
          </div>
          <button type="submit">Adicionar Nota Fiscal</button>
          {created !== null ? <p>{created}</p> : <></>}
        </form>
      </div>
      
    </div>
  );
}

export default App;
