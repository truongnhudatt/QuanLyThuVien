import React from "react";


// const changeIMG = document.querySelector("img").src
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64Data: null
    };
  }

  onChange = e => {
    console.log("file uploaded: ", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  };

  _handleReaderLoaded = e => {
    console.log("file uploaded 2: ", e);
    let binaryString = e.target.result;
    this.setState({
      base64Data: btoa(binaryString)
    });
  };

  render() {
    const { base64Data } = this.state;
    return (
      <div>
        <input
          type="file"
          name="fileImage"
          className="form-control"
          accept=".jpg, .jpeg, .png"
          onChange={e => this.onChange(e)}
        />
        <br />
        {/* {<img src={base64Data === null ? `data:image;base64,${this.props.value}` : `data:image;base64,${base64Data}`}style={{display:"block",marginLeft: "auto", marginRight:"auto",width: "50%"}}/>} */}
        {<img src={base64Data === null ? `data:image;base64,${this.props.value}` : `data:image;base64,${base64Data}`}style={{display:"block",marginLeft: "auto", marginRight:"auto",width: "50%"}}/>}
        
      </div>
    );
  }
}

export default ImageUpload;
