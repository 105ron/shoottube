import axios from 'axios';
import React, { Component } from 'react';

const defaultState = {
  selectedFile: null,
  title: '',
  description: '',
};

class Upload extends Component {
  constructor(props) {
    super(props);
      this.state = defaultState
  }

  fileChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  titleChangeHandler = ({target: {value}}) => {
    this.setState({
      title: value,
    })
  }

  descriptionChangeHandler = ({target: {value}}) => {
    this.setState({
      description: value,
    })
  }

  onClickHandler = () => {
    const {selectedFile, title, description} = this.state;
    const data = new FormData();
    data.append('file', selectedFile);
    data.append('title', title);
    data.append('description', description);
    axios.post("http://localhost:8000/upload", data, { 
    }).then(res => {
      console.log(res.statusText)
      this.setState(defaultState)
    })
  }

  render() {
    const { description, selectedFile, title } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="center-card st-column col-12 col-sm-10 col-md-8 col-lg-6 white card shadow p-3 mb-5 bg-white rounded">
            <p className="h4 mb-4">Upload Video</p>
            <input
              className="form-control mb-4"
              name="title"
              onChange={this.titleChangeHandler}
              placeholder="Video title"
              type="text"
              value={ title }
            />
            <div class="form-group">
              <textarea
                className="form-control rounded-0"
                name="description"
                placeholder="Description of video"
                rows="3"
                onChange={this.descriptionChangeHandler}
                value={ description }
              />
            </div>
            <label htmlFor="file-upload" className="form-label">
              Upload Your File
            </label>
              <input
                className="form-button"
                id="file-upload"
                name="file"
                onChange={this.fileChangeHandler}
                type="file"
              />
              <button
                className="btn btn-info btn-block"
                disabled={!selectedFile}
                onClick={this.onClickHandler}
                type="button"
              >
                Upload
              </button> 
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;