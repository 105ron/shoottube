import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    const loader = (
      <div>
        Loading
      </div>
    );
    const videos = data.map(({
      _id, summary, title, thumbnail,
    }) => (
      <div key={_id}>
        <Link to={`/play/${_id}`} params={{ slug: _id }}>
          <h5>{title}</h5>
        </Link>
        <p>{summary}</p>
        <img src={`./videos/${thumbnail}`} alt={`A thumbnail of ${title}`} />
      </div>
    ));
    return loaded
      ? videos
      : loader;
  }
}

export default Index;
