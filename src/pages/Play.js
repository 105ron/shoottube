import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
    const loader = (
      <div>
        Loading
      </div>
    );
    const video = (
      <div>
        <h2>
          {title}
        </h2>
        <p>
          {summary}
        </p>
        <video width="320" height="240" controls>
          <source src={`http://localhost:8000/stream/${fileName}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
    return loaded
      ? video
      : loader;
  }
}

export default withRouter(Play);
