import axios from 'axios';
import React, { Component } from 'react';

class Upload extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        title: '',
        description: '',
      }
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
    })
  }

  render() {
    const { description, selectedFile, title } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 card shadow p-3 mb-5 bg-white rounded" style={ {margin: '30px auto'} }>
            <form method="post" action="#" id="#">
              <div className="form-group files" style={ {textAlign: 'center'} }>
                <label htmlFor="title-name"style={ {display: 'block'} }>
                  Title
                </label>
                <input id="titleName" type="text" name="title" onChange={this.titleChangeHandler} value={ title }/>
                <label htmlFor="title-description"style={ {display: 'block'} }>
                  Decription
                </label>
                <input id="title-description" type="text" name="description" onChange={this.descriptionChangeHandler} value={ description } />
                <label htmlFor="file-upload"style={ {display: 'block'} }>
                  Upload Your File
                </label>
                  <input id="file-upload" type="file" name="file" onChange={this.fileChangeHandler} />
                  <button
                    className="btn btn-success btn-block"
                    disabled={!selectedFile}
                    onClick={this.onClickHandler}
                    style={ {margin: '10px auto', width: '50%'} }
                    type="button"
                  >
                    Upload
                  </button> 
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;