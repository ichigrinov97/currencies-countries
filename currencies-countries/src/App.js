import img from './img/img.svg'
import style from './App.module.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [flag, setFlag] = useState(true)
  const [array, setArray] = useState([])
  const [text, setText] = useState('Выберите валюту')

  function block() {
    if (flag == true) {
      setFlag(false)
    } else {
      setFlag(true)
    }
  }

  async function data() {
    const getData = await axios.get('https://www.nbrb.by/API/ExRates/Currencies')
    console.log(getData);
    setArray(getData.data)

  }

  useEffect(function () {
    data()
  }, []);



  return (
    <div className={style.mainCountainer}>

      <div className={style.inpt}>
        <h1>{text}</h1>
        <button onClick={block}><img src={img} alt="" /></button>
      </div>

      {flag == true ? <div className={style.list}>
        {array.map((el) => <p onClick={(e) => {
          setText(e.target.textContent)
          block()
        }
        }>{el.Cur_Name}</p>)}
      </div> : null}

    </div>
  );
}

export default App;
