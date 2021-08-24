import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class MyQuill extends React.Component {
  constructor(props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
  }

  componentDidMount() {
    this.attachQuillRefs()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    const editor = this.reactQuillRef.getEditor();
    this.quillRef  = this.reactQuillRef.makeUnprivilegedEditor(editor);
    
  }

  // insertText = () => {
  //   var range = this.quillRef.getSelection();
  //   let position = range ? range.index : 0;
  //   this.quillRef.insertText(position, 'Hello, World! ')
  // }

  getText = () => {
    // unprivilegedEditor.getContent();
    const text = this.quillRef.getContents();
    console.log(text);
  }

  render() {
    // const editor = this.reactQuillRef.getEditor();
    // const unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditsor(editor);
    // You may now use the unprivilegedEditor proxy methods
    // unprivilegedEditor.getContent();

    return (
      <div>
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          theme={'snow'} />
        <button onClick={this.getText}>Insert Text</button>
      </div>
    )
  }
}

export default MyQuill;