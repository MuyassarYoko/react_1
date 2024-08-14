import logo from './logo.svg';
import './App.css';
import './Light-mode.css';
import { useEffect, useState } from 'react';

function App() {
  function form_submit(e){
    e.preventDefault()
    let form_list = document.querySelector('.form_list')
      let div = document.createElement('div');
      div.classList.add('i')
      div.innerHTML = `
          <p id='p'>Name: ${e.target.name.value}</p>
          <p id='p'>Age: ${e.target.age.value}</p>
          `
        form_list.append(div)

  }
  
  let products = [
    {name: 'Alarm', price: 10000, count: 3 },
    {name: 'Bag', price: 50000, count: 10 },
    {name: 'Book', price: 80000, count: 20 },
  ]


  const [theme, setTheme] = useState(() => {
    const mode = JSON.parse(localStorage.getItem("mode"));
    return mode || "light";
  });
  const switchTheme = () => {
    setTheme(cur => {
      const newTheme = cur === "light" ? "dark" : "light";
      localStorage.setItem("mode", JSON.stringify(newTheme));
      return newTheme;
    });
  }  
  console.log(theme, "theme")

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000)
  }, [])

  function CurrentDayInfo(e){
    // e.preventDefault()
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const DayWeek = date.toLocaleString('ru', {weekday: 'long'});

    if (day % 2 === 0){
      return `${month} ${year}`
    }
    else{
      return`${DayWeek} ${day}`
    }
  }

  return (
    // <>
      <div className='wrapper' id={theme} >
        <div className='toggle-container'>
          <p style={{color: theme === "light" ? "black" : "red"}}>{theme} mode</p>
          <input onChange={switchTheme} type='checkbox' id='toggle-btn' />
          <label htmlFor='toggle-btn' className='toggle-label'></label>
        </div>
        <div className='container'>
          <div id='sun' className='shape'></div>
          <div id='moon' className='shape'></div>
        </div>
      
      
        <form onSubmit={form_submit}>
          <input type='name' placeholder='name' name='name'/>
          <input type='number' placeholder='age' name='age'/>
          <input type='submit' value='send'/>
        </form><br></br>
        <div className='form_list'></div><br/>
        {products.map((item, index) => (
          <div className='item-card' style={{padding: 15, border: '2px solid #ccc', color: theme === "light" ? "black" : "#e2ecf0"}}>
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
            <p>Count: {item.count}</p>
          </div>
        ))}<br/>
        <p style={{color: theme === "light" ? "black" : "red"}}>{time.toLocaleTimeString()}</p><br/>
        <p style={{color: theme === "light" ? "black" : "red"}}>Current day: {CurrentDayInfo()}</p>
      </div>
    // </>
  );
}

export default App;
