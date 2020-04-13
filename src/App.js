import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImg from './images/covid19.png';
class App extends React.Component {
   state ={
     data: {},
     country : ''
   }
  async componentDidMount() {
    const data = await fetchData();
     this.setState({data:data});
  }
  handleCountryChange = async (country) => {
     const data = await fetchData(country);
    this.setState({data:data, country: country});
  }
  render() {
     const {data, country} = this.state;
    return (
      <div className={styles.container}>
        <img src={coronaImg} className={styles.image} alt="COVID-19"/>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;
