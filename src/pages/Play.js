import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import loader from './Index';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
  }

  componentDidMount() {
    const { match: { params: { slug } } } = this.props;
    const getVideo = async () => {
      const response = await axios({
        url: `http://localhost:8000/play/${slug}`,
        method: 'GET',
      });
      this.setState({ data: response.data[0], loaded: true });
      await axios({
        url: `http://localhost:8000/stream/${response.data[0].fileName}`,
        method: 'GET',
      });
    };
    getVideo();
  }

  render() {
    const { data: { fileName, summary, title }, loaded } = this.state;
    const video = (
      <div className="container">
        <div className="row">
          <div className="center-card st-column col-12 col-sm-10 col-md-8 col-lg-6 white card shadow p-3 mb-5 bg-white rounded">
            <h4 className="card-title">{title}</h4>
            <h6 className="card-subtitle mb-2 text-muted">{summary}</h6>
            <video controls>
              <source src={`http://localhost:8000/stream/${fileName}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    );
    return loaded
      ? video
      : loader;
  }
}

export default withRouter(Play);
