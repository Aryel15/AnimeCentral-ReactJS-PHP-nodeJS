import React from 'react'
import './adicionar.css'
import Menu from '../../components/Menu/Menu';

export default function Adicionar() {
    var user = localStorage.getItem("user");
    const [anime, setAnime] = React.useState({
        titulo: '',
        status_: '',
        nota:'',
        user:''
    });

    const [status, setStatus] = React.useState({
      type: '',
      mensagem: ''
    })
    let valorInput = e => setAnime({...anime, [e.target.name]: e.target.value, user})

    const cadAnime = async e =>{
        e.preventDefault();
        console.log(anime);

        await fetch("http://localhost/youranimes/cadastrar.php",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({anime})
        })
        .then((response) => response.json())
        .then((responseJson) =>{
          if(responseJson.erro){
            setStatus({
              type: 'erro',
              mensagem: responseJson.message
            })
          }else{
            setStatus({
              type: 'sucess',
              mensagem: responseJson.message
            })
          }

        }).catch(() =>{
          setStatus({
            type: 'erro',
            mensagem: 'Anime não adicionado, tente mais tarde!'
          })
        })
    }

    const [data, setData] = React.useState([]);
    const getAnimes = async () => {
      fetch("http://localhost/youranimes/index.php")
      .then((response) => response.json())
      .then((responseJson) => (
        //console.log(responseJson),
        setData(responseJson.records)
      ));
    }
  
    React.useEffect(() => {
      getAnimes();
    },[])


  return (
    <>
      <Menu/>
      <div className="adicionar">
        <h1>Adicionar anime</h1>
        { status.type === 'erro'? <p className="messageErro">{status.mensagem}</p> : "" }
        { status.type === 'sucess'? <p className="messageSucess">{status.mensagem}</p> : "" }

        <form className='cadastro' action='/' onSubmit={cadAnime}>
          <label htmlFor="titulo">Titulo:</label><br />
          <input type="text" name='titulo' onChange={valorInput} list="titulo"/>
          <datalist name="titulo" id="titulo">
            {
              Object.values(data).filter((anime, a, b) => String(anime).indexOf(a.titulo) === b.titulo).map(anime => (
                <option key={anime.titulo} value={anime.titulo} />
              ))
            }
          </datalist><br />
          <label htmlFor="status_">Status:</label><br />
          <input type="text" name='status_' onChange={valorInput} list="status" id='status_'/>
          <datalist name="status_" id="status">
            <option value='Completo'/>
            <option value='Assistindo'/>
            <option value='Dropou'/>
          </datalist><br />
          <label htmlFor="nota">Nota:</label><br />
          <input type="number" min="1" max="10" name='nota' onChange={valorInput}/><br />
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </>
  )
}
