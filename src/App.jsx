import { useState, useRef } from 'react'
import './main.css'

export default function App() {
  const id_counter = useRef(0);
  const [images, setImages] = useState([]);

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', evt => {
        resolve(evt.currentTarget.result);
      });

      fileReader.addEventListener('error', evt => {
        reject(new Error(evt.currentTarget.error));
      });

      fileReader.readAsDataURL(file);
    });
  }

  const handleSelect = async (e) => {
    const files = [...e.target.files];
    const urls = await Promise.all(files.map(file => fileToDataUrl(file)));
    if (urls) {
      const temp = [];
      urls.forEach((url) => {
        temp.push({ id: id_counter.current, data: url });
        id_counter.current += 1;
      });
      setImages([...images, ...temp]);
    }
  }

  const removeThis = (e) => {
    const id = parseInt(e.target.getAttribute('data-id'));
    setImages(images.filter(img => img.id !== id));
  }

  return (
    <div className="app">
      <input type="file" id="app_select-file" name="app_select-file" onChange={handleSelect} multiple />
      <label className="app_select-file_label" htmlFor="app_select-file">
        Click to select
      </label>
      <div className="previews_gallery">
        {images.map(img => (
          <div className="preview" key={img.id}>
            <img className="preview_img" src={img.data} />
            <div className="preview_close" onClick={removeThis} data-id={img.id}>✕</div>
          </div>
        ))}
      </div>
    </div>
  );
}

