import React, { Component } from "react";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.onChange = this.onChange.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  onChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  resetFile(event) {
    event.preventDefault();

    this.setState({ file: null });
  }
  render() {
    return (
      <div>
        {!this.state.file && <input type="file" onChange={this.onChange} />}

        {this.state.file && (
          <div style={{ textAlign: "center" }}>
            <button onClick={this.resetFile}>Remove File</button>
          </div>
        )}
        <img style={{ width: "75px" }} src={this.state.file} />
      </div>
    );
  }
}
export default FileUpload;
