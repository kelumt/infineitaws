import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleJobDetails = this.toggleJobDetails.bind(this);
        this.toggleJobs       = this.toggleJobs.bind(this);

        this.state = {
            jobList: [],
            isJObCard: true
        };
    }

    toggleJobDetails(jobId){
      //alert(jobId);
      this.setState({isJObCard: false, jobId: jobId});
    }

    toggleJobs(){
      this.setState({isJObCard: true});
    }

    loadJobsFromServer() {
      var self = this;
      $.ajax({
        url: "http://localhost:8080/api/jobs"
      }).then(function (data) {
        self.setState({jobList: data._embedded.jobs});
      });
    }

    componentDidMount() {
      this.loadJobsFromServer();
    }

    render() {
        const isJObCard = this.state.isJObCard;

        let component = null;
        if (isJObCard) {
          component = <JobList jobs = {this.state.jobList} toggleJobDetailsfn = {this.toggleJobDetails} />;
        } else {
          component = <JObDetail jobId = {this.state.jobId} toggleJobsfn = {this.toggleJobs}/>;
        }

        return (
          <div>
            {component}
          </div>
        );
    }
  }

  class JobList extends React.Component {
    constructor(props){
      super(props);
    }

    render(){
      return (
        <div className="main-jobs">
          {this.props.jobs.map(job => (
              <Job job={job} toggleJobDetailsfn = {this.props.toggleJobDetailsfn}/>
          ))}
        </div>
      );
    }
  }

  class Job extends React.Component {
    constructor(props){
      super(props);
    }

    render(){
      var job = this.props.job;
      return(

            <div className="item">
              <div className="left">
                <h4 className="title">Job #{job.id}</h4>
                <span className="info">{job.description}</span>
              </div>
              <div className="right">
                <div>
                  <button className="btn btn-success" onClick={() => this.props.toggleJobDetailsfn(job.id)}>Start</button>
                </div>
              </div>
            </div>


      );
    }
  }

  class JObDetail extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          subJobList: [],
      };
    }

    loadJobDetailFromServer(jobId) {
      var self = this;
      $.ajax({
        url: "http://localhost:8080/api/jobs/"+jobId
      }).then(function (data) {
        console.log(data.subJobList);
        self.setState({subJobList: data.subJobList});
      });
    }

    componentDidMount() {
      this.loadJobDetailFromServer(this.props.jobId);
    }

    render() {
        return (

        <div className="jumbotron blank">
			  	<div className="title row">
			  		<div className="col-xs-6 caption">JOB# 1 - James Preston</div>
			  		<div className="col-xs-6 text-right time">Elapsed Time: 1hr 20min</div>
          </div>
			  	<div className="body">
			  		<div className="row">
						<div className="col-xs-6">
							<div className="data">
							  <div>
							  <div>Make</div>
							  <div>Subaru Forester</div>
							  </div>
							  <div>
							  <div>Year</div>
							  <div>2009</div>
							  </div>
							  <div>
							  <div>Reg No</div>
							  <div>WPKWP5</div>
							  </div>
							  <div>
							  <div>Odometer</div>
							  <div>125000</div>
							  </div>
							</div>
						</div>
				  		<div className="col-xs-6 text-right">
				  			<div>Pickupt Time: 3:30 PM</div>
				  			<button className="btn btn-success">In Progress</button>
				  		</div>
			  		</div>
			  		<div className="row">
						<div className="col-xs-12">
							<div className="sub-jobs">

                {this.state.subJobList.map(subJob => (
								<div className="item">
									<div className="left">
                      <h4 className="title">{subJob.description}</h4>
										<span className="info">Use Caltex 30 only forc this vehicle as requested by customer</span>
									</div>
									<div className="right">
										<div>
											<button className="btn btn-primary">Done</button>
											<button className="btn btn-danger">Blocked</button>
										</div>
									</div>
								</div>
                ))}

							</div>
						</div>
			  		</div>
			  	</div>
          <button className="btn btn-back" onClick={this.props.toggleJobsfn}>Back</button>
			  </div>



        );
    }
  }

  ReactDOM.render(<App/>, job_list);