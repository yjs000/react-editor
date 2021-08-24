import React, { useState } from "react";
import Editor from "./Editor2";
import { useForm } from "react-hook-form";

const PostForm = () => {

  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');

  const onEditorChange = (value) => {
    setContent(value);
  }

  const onFilesChange = (files) => {
    setFiles(files);
    console.log(files);
  }

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit"
  });

  const onSubmit = (InputData) => {
    const fullData = Object.assign(InputData, {content}, {files});
    console.log(fullData);
  }

  return (
    <>
     <form onSubmit={handleSubmit(onSubmit)}>
      <select className="mb-2 form-select" name="category"  {...register("category")} >
        <option value="공지사항">공지사항</option>
      </select>

      <input className="mb-2 postform" type="text" placeholder="제목" name="what" {...register("what", {required : "제목을 입력해주세요"})}/>
      <Editor onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
        placeholder={"여기에 글을 써주세요"} />

      <p className="text-right"><input type="checkbox" name="isTop"  {...register("isTop")}/>상단 고정</p>

      {/* {console.log(errors.title)} */}
      {/* {errors.title && <p>{errors.title.message}</p>} */}


      <div className="text-center">
        <input type="submit" className="btn btn-primary btn-hover-secondary" value="글쓰기"/>
      </div>
      </form>
    </>
  )
}

export default PostForm;