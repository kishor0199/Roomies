import React from 'react'
import axios, { post } from 'axios';

class Hostel extends React.Component {

 

  fileUpload(file){
    const url = 'http://localhost:8080/hostels/insertHostelImg';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    console.log(formData);
    return  post(url, formData,config)
  }

  render() {
    return (
      <form action='http://localhost:8080/hostels/insertHostelImg' method='post' enctype="multipart/form-data">
        <h1>File Upload</h1>
        <input type="file" name='image' multiple onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}



export default Hostel