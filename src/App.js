import React, {Component} from 'react';
import './App.css';
import {sensorService} from "./service/sensorService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faCloud,faTemperatureHigh,faTachometerAlt,faFireExtinguisher,faFire } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";


export default class App extends Component{
  constructor(props) {
    super(props);

    this.state={
        sensors: []
    };

    this.sensorService = new sensorService();
    this.createCard = this.createCard.bind(this);
  }

  componentDidMount() {
      this.sensorService.getAll()
        .then(data => this.setState({sensors:data}));

    this.timer = setInterval(() => this.sensorService.getAll()
        .then(data => this.setState({sensors:data})) ,40000 );
  }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

  createCard(){
      var data = this.state.sensors;

      const SmokeLevel = ({done}) => {
          const [style, setStyle] = React.useState({});

          setTimeout(() => {
              const newStyle = {
                  opacity: 1,
                  width: `${done}%`
              }

              setStyle(newStyle);
          }, 200);

          return (
              <div className="progress">
                  <div className="progress-done-sm" style={style}>
                      {done}%
                  </div>
              </div>
          )
      }

      const CO2Level = ({done}) => {
          const [style, setStyle] = React.useState({});

          setTimeout(() => {
              const newStyle = {
                  opacity: 1,
                  width: `${done}%`
              }

              setStyle(newStyle);
          }, 200);

          return (
              <div className="progress">

                  <div className="progress-done" style={style}>
                      {done}%
                  </div>
              </div>
          )
      }


      return data.map(sen =>(
          <div  className="col-md-4">
              <div className={"card text-center shadow " + ( ((sen.smoke > 5) || (sen.co2 >5)) && (sen.status == 'active') ? 'bg-danger' : 'bg-light')}>
                  <div className="overflow">
                      <FontAwesomeIcon icon={faFire}/><br/>
                      <lable className="badge">Sensor</lable>
                      <span className="badge badge-dark">{sen.id}</span>&nbsp;:&nbsp;
                      <span className={"badge "+ (sen.status=="active" ?  'badge-success' : 'badge-danger')}>{sen.status}</span>
                  </div>
                  <div className="cardData text-dark text-left">
                      <h3><span className="badge">Sensor Name : {sen.sensorname}</span></h3>
                      <div className="divFloorRoom">
                          <h5 className="floorRoom"><span className="badge text-black-50">Floor No &nbsp;&nbsp;: {sen.floor}</span></h5>
                          <h5 className="floorRoom"><span className="badge text-black-50">Room No &nbsp;: {sen.room}</span></h5>
                      </div>
                  </div>
                  <div className="panel-body">
                      <dv>
                          <div className="iconLableDiv">
                              &nbsp; <FontAwesomeIcon icon={faFireExtinguisher} />&nbsp;&nbsp;
                              <lable className="badge badge-info">Co2</lable>
                          </div>
                          <br/>
                          <CO2Level done={sen.status == 'active' ? sen.co2*10 : 0}/>
                      </dv>
                      <div>
                          <div className="iconLableDiv">
                              &nbsp;  <FontAwesomeIcon icon={faCloud}/>&nbsp;
                              <lable className="badge badge-success">Smoke</lable>
                          </div>
                            <br/>
                          <SmokeLevel done={sen.status == 'active' ? sen.smoke*10 :0}/>
                      </div>

                  </div>
              </div>
          </div>

      ));
  }


  render() {


    return (
        <div className="">
            <div className="p-3 mb-2 bg-dark text-light text-center"><h2>SENSOR DASHBOARD</h2></div>
            <div className="container-xl d-flex justify-content-center">
                <div className="row">
                    {this.createCard()}
                </div>
            </div>



        </div>
    );
  }
}
