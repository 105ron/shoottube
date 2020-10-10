import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
  }

  render() {
    const { selectedFile } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 card shadow p-3 mb-5 bg-white rounded" style={ {margin: '30px auto'} }>
            <form method="post" action="#" id="#">
              <div className="form-group files" style={ {textAlign: 'center'} }>
                <label htmlFor="fileupload"style={ {display: 'block'} }>
                  Upload Your File
                </label>
                  <input id="fileupload" type="file" name="file" onChange={this.onChangeHandler} />
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

export default App;
