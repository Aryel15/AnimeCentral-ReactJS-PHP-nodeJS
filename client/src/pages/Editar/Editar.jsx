import React from 'react';
import './editar.css';
import '../../components/Menu/menu.css';
import { useParams } from 'react-router-dom';
import { ToggleTheme } from '../../Themes/ToggleTheme';

export default function Editar() {
    const {id} = useParams();
    const [anime, setAnime] = React.useState({
      id:'',
      titulo: '',
      status_: '',
      nota:''
    });
    const [status, setStatus] = React.useState({
      type: '',
      mensagem: ''
    })
    let valorInput = e => setAnime({...anime, [e.target.name]: e.target.value, id})
    /*var [titulo, setTitulo] = React.useState('');
    var [status_, setStatus_] = React.useState('');
    var [nota, setNota] = React.useState('');*/

      React.useEffect(() =>{
        const getAnime = async () =>{
          await fetch("http://localhost/youranimes/visualizar.php?id=" + id)
          .then((response) => response.json())
          .then((responseJson) =>{
            const animes = Object.values(responseJson)[0];
            setAnime({...anime, titulo: animes.titulo, status_: animes.status_, nota: animes.nota})
          });
        }
        getAnime();
      }, [id]);
      
      const editAnime = async e =>{
        e.preventDefault();

        await fetch("http://localhost/youranimes/editar.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({anime})
        }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.erro){
            setStatus({
              type: 'erro',
              mensagem: responseJson.mensagem
            })
          }else{
            setStatus({
              type: 'sucess',
              mensagem: responseJson.mensagem
            })
            setTimeout(function() {
              window.location.pathname = "/meusanimes";
            }, 3000);
          }
          
        }).catch(() =>{
          setStatus({
            type: 'erro',
            mensagem: 'Não foi possível editar, tente mais tarde!'
          })
        })
      }
      const[menuAberto, setMenu] = React.useState(false);


  return (
    <>
      <nav>
        <a className='logo' href="/"><img src="../imgs/logo-n.png" alt="logo Anime Central nas cores branco e cinza" /></a>
        <input type="checkbox" name="" id="input-checkbox" className="input-checkbox"/>
        <label htmlFor="input-checkbox" className="nav-button" onClick={() => setMenu(!menuAberto)}>
            <span></span>
        </label>
        <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
            <li><a href="/">Home</a></li>
            <li><a href="/adicionar">Adicionar Anime</a></li>
            <li><a href="/meusanimes">Meus animes</a></li>
            <ToggleTheme/>
        </ul>
      </nav>
      <div className="adicionar">
        <h1>Editar anime</h1>
        { status.type === 'erro'? <p className="messageErro">{status.mensagem}</p> : "" }
        { status.type === 'sucess'? <p className="messageSucess">{status.mensagem}</p> : "" }
        <form className='cadastro' onSubmit={editAnime}>
          <label htmlFor="titulo">Titulo:</label><br />
          <input type="text" name='titulo' value={anime.titulo} onChange={valorInput}/><br />
          <label htmlFor="status_">Status:</label><br />
          <input type="text" name='status_' value={anime.status_} onChange={valorInput} list="status" id='status_'/>
          <datalist name="status_" id="status">
            <option value='Completo'/>
            <option value='Assistindo'/>
            <option value='Dropou'/>
          </datalist><br />
          <label htmlFor="nota">Nota:</label><br />
          <input type="number" min="1" max="10" name='nota' value={anime.nota} onChange={valorInput}/><br />
          <button type='submit'>Editar</button>
        </form>
      </div>
    </>
  )
}
