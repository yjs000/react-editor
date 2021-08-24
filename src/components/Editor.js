import React, {useState} from "react"
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const BlockEmbeded = Quill.import('blots/block/embed');
class ImageBlot extends BlockEmbeded{
  static create(value) {
    let imgTag = super.create();
    imgTag.setAttribute('alt', value.alt);
    imgTag.setAttribute('src', value.src);
    return imgTag;
  }

  static value(node){
    return {src: node.getAttribute('src'), alt: node.getAttribute('alt')};
  }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

function imageHandler() {
  document.getElementById("inputImage").click();
}


/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" onChange={e => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-image"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
    </select>
    {/* <button className="ql-insertStar">
      <CustomButton />
    </button> */}
  </div>
)

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.reactQuillRef = null; // ReactQuill component
    this.state = { editorHtml: '' }
    this.state = { files: []}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
  }
  
  componentDidMount() {
    this.attachQuillRefs();
    this._isMounted = true;
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  insertImage = (e) => {
    if(e.target.files.length > 0){
      const file = e.target.files[0];
  
      // let formData = new FormData();
  
      // formData.append("file", file);
  
      // dispatch(sendFile(formData));
  
      const quill = this.quillRef;
      quill.focus();
  
      let range = quill.getSelection();
      let position = range ? range.index : 0;
      const filename = file.name;
      const src = "../upload/"+filename;

      quill.insertEmbed(position, "image", {src: src, alt:filename});
      quill.setSelection(position+1);
  
      if(this._isMounted){
        this.setState({
          files: [...this.state.files, file]
        }, () => {this.props.onFilesChange(this.state.files)});
      }
    } else {
      return alert("failed to upload fle");
    }
  }



  render() {
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
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          value={this.state.editorHtml}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          ref={(el) => { this.reactQuillRef = el }}
        />
        <input id="inputImage" type="file" accept="image/*" onChange={this.insertImage}/>
        {console.log(this.state.editorHtml)}
        <div>
        </div>
      </div>
      </>
    )
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      "image": imageHandler,
    }
  }
}

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color',
]
export default Editor;