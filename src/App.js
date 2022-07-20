import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const baseUrl = 'https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=%2020';
  const [info, setInfo] = useState([]);

  const [idx, setIdx] = useState(-1);

  useEffect(() => {
    axios.get(baseUrl)
    .then(res => {
      setInfo(res.data.results);
    })
    .catch(err => {
      console.log(err.message);
    })

    // setIdx(0);
  },[])

  // console.log(info);

  return (
    <div className="App">
      <div className='content'>
        <div className='heading'>
          <div className='image'>
            {
              idx >= 0 && <img src={info[idx]?.picture?.thumbnail} alt='no img'/>
            }
          </div>
          <div className='info'>
            <h1>
              {
                idx >= 0 && `${info[idx].name.title} ${info[idx].name.first} ${info[idx].name.last}`
              }
            </h1>
            <p>
              {
                idx >= 0 && `${info[idx].location.street.number}, ${info[idx].location.street.name}, ${info[idx].location.city}, ${info[idx].location.state}, ${info[idx].location.country}, ${info[idx].location.postcode}`
              }
              <br/>
              {
                idx >= 0 && `${info[idx].location.timezone.offset} ${info[idx].location.timezone.description}`
              }
            </p>
          </div>
        </div>
{/* style={ { backgroundColor: i == idx ? '#c337d3' : 'white' } }   onClick={() => setIdx(i)} */}
        <div className='grid'>
          {
            info.map((item, i) => (
              <div className='card' style={ { backgroundColor: i === idx ? '#c337d3' : 'white', 
                                              color : i === idx ? 'white' : '' } }
                    key={i} 
                    onClick={() => setIdx(i)}
              >
                <p>{ `${item.gender.toUpperCase()} . ${item.nat}` }</p>
                <h4>{ `${item.name.title} ${item.name.first} ${item.name.last}` }</h4>
                <p className='mail' style={ { color: i === idx ? 'white' : '' } }>{ item.email }</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
