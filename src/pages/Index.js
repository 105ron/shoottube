import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export const loader = (
  <div className="spinner-container">
    <div className="spinner-grow" role="status" />
  </div>
);

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
  }

  componentDidMount() {
    const getVideos = async () => {
      const response = await axios({
        url: 'http://localhost:8000/videos',
        method: 'GET',
      });
      this.setState({ data: response.data, loaded: true });
    };
    getVideos();
  }

  render() {
    const { data, loaded } = this.state;
    const videos = (
      <div className="row">
        {data.map(({
          _id, summary, title, thumbnail,
        }) => (
          <div className="st-column col-12 col-sm-8 col-md-6 col-lg-4 white">
            <div className="card" key={_id}>
              <img
                alt={`A thumbnail of ${title}`}
                className="card-img-top"
                src={`./videos/${thumbnail ? thumbnail : 'default_frog.jpg'}`}
              />
              <h4 className="card-title">{title}</h4>
              <h6 className="card-subtitle mb-2 text-muted">{summary}</h6>
              <Link to={`/play/${_id}`} params={{ slug: _id }}>
                Play&nbsp;
                {title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
    return loaded
      ? videos
      : loader;
  }
}

export default Index;
