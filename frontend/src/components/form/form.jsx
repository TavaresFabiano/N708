import '../form/form.css'
import { useEffect, useState, useRef } from 'react'
import Lixeira from '../../assets/Lixeira.svg'
import Api from '../../../src/service/api'

function Form() {

  const [users, setUsers] = useState([])
  const inputNome = useRef()
  const inputTel = useRef()
  const inputNascimento = useRef()
  const inputCep = useRef()
  const inputEndereco = useRef()

  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios')

    setUsers(usersFromApi.data)
  }


  async function createUsers() {
    await Api.post('/usuarios', {
      nome: inputNome.current.value,
      tel: inputTel.current.value,
      nascimento: inputNascimento.current.value,
      cep: inputCep.current.value,
      endereco: inputEndereco.current.value

    })

    getUsers()

  }

  async function deleteUsers(_id) {
    await Api.delete(`/usuarios/${_id}`)

    getUsers()
  }


  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de clientes</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputNome} />
        <input placeholder="Tel" name='tel' type='text' ref={inputTel} />
        <input placeholder="Nascimento" name='nascimento' type='text' ref={inputNascimento} />
        <input placeholder="Cep" name='cep' type='text' ref={inputCep} />
        <input placeholder="Endereço" name='endereco' type='text' ref={inputEndereco} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user._id} className='card'>
          <div>
            <p>Nome: <span>{user.nome}</span> </p>
            <p>Tel: <span>{user.tel}</span> </p>
            <p>Nascimento: <span>{user.nascimento}</span> </p>
            <p>Cep: <span>{user.cep}</span> </p>
            <p>Endereço: <span>{user.endereco}</span> </p>
          </div>
          <button onClick={() => deleteUsers(user._id)} >
            <img src={Lixeira}/>
          </button>
        </div>
      ))}

    </div>

  )
}

export default Form
