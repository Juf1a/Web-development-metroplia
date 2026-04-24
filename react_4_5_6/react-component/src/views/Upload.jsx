import { useState } from 'react';
import { useNavigate } from 'react-router';
import useForm from '../hooks/formHooks';
import { useMedia, useFile } from '../hooks/apiHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { postMedia } = useMedia();
  const { postFile } = useFile();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);
      navigate('/');
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doUpload, initValues);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  return (
    <>
      <h1>Upload</h1>
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-col w-4/5">
          <label htmlFor="title">Title</label>
          <input
            className="my-2.5 p-2.5 border border-[#ccc] rounded bg-[#1a1a1a] text-white"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label htmlFor="description">Description</label>
          <textarea
            className="my-2.5 p-2.5 border border-[#ccc] rounded bg-[#1a1a1a] text-white"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex flex-col w-4/5">
          <label htmlFor="file">File</label>
          <input
            className="my-2.5"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          className="w-[200px] h-[200px] object-cover rounded my-2.5"
          src={file ? URL.createObjectURL(file) : 'https://placehold.co/200?text=Choose+image'}
          alt="preview"
        />
        <button
          className="my-2.5 px-4 py-2 rounded bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111] disabled:opacity-40 disabled:cursor-default"
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
