import React, { Component } from 'react';

class WeatherUI extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            weather: {},
            key: "8713314e929a6ae57041a78e979b402d",
            base: "http://api.openweathermap.org/data/2.5/"
        }
    }

    setQuery = (props) => {
        this.setState({
            query: props
        })
    }

    setWeather = (props) => {
        this.setState({
            weather: props
        })
    }

    search = (evt) => {
        if (evt.key === "Enter") {
          fetch(`${this.base}weather?q=${this.query}&units=metric&APPID=${this.key}`)
            .then(res => res.json())
            .then(result => {
              this.setWeather(result);
              this.setQuery('');
              console.log(result);
            });
        }
    }

    dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day}, ${date} ${month} ${year}`;
    }

    changeBackground = () => {
        let background = "App "
    
        if (typeof this.weather.main != "undefined") {
          background = background.concat(this.weather.weather[0].main);
        } else {
          return background;
        }
    
        return background;
    }

    render() {
        return (
            <div className={this.changeBackground()}>
                <main>
                    <div className="search-box">
                    <input 
                        type="text"
                        className="search-bar"
                        placeholder="Search City" 
                        onChange={event => this.setQuery(event.target.value)}
                        value={this.query}
                        onKeyPress={this.search} />
                    </div>

                    {(typeof this.weather.main != "undefined") ? (
                    <div>
                    <div className="location-box">
                        <div className="location">{this.weather.name}, {this.weather.sys.country}</div>
                        <div className="date">{this.dateBuilder(new Date())}</div>
                    </div>

                    <div className="weather-box">
                        <div className="temperature">{Math.round(this.weather.main.temp)}°C</div>
                        <div className="temperature">{Math.round((9 / 5) * this.weather.main.temp + 32)}°F</div>
                        <div className="weather">{this.weather.weather[0].main}</div>
                    </div>
                    </div>
                    ) : ('')}
                </main>
            </div>
        )
    }
}

export default WeatherUI;