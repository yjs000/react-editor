import React, {
  useState, 
  // useEffect 
} from "react";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { useDispatch } from "react-redux";
// import MyQuill from "./MyQuill";


const Editor2 = () => {

  const [editorHtml, setEditorHtml] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', { 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const insertImage = (e) => {
    if(e.target.files.length > 0){
      const file = e.target.files[0];
  
      if(this._isMounted){
        this.setState({
          files: [...this.state.files, file]
        }, () => {this.props.onFilesChange(this.state.files)});
      }
    } else {
      return alert("failed to upload fle");
    }
  }

  return (
    <>
      <style type="text/css">
        {`
        #inputImage {
          display:none;
        }

        .ql-container.ql-snow{
          height: 30rem;
          border-radius: 0px 0px 5px 5px;
        }
        .ql-toolbar.ql-snow{
          border-radius: 5px 5px 0px 0px;
        }
      `}
      </style>
        <ReactQuill className="mb-2 editor" theme="snow"
                  modules={modules}
                  value={editorHtml} onChange={setEditorHtml}
                  >
        </ReactQuill>
        <input id="inputImage" type="file" accept="image/*" onChange={this.insertImage}/>
        {console.log(editorHtml)}
          
        {/* <div dangerouslySetInnerHTML={{__html: content}}></div>
        {content} */}
        {/* <MyQuill /> */}
      </>
  );
}

export default Editor2;