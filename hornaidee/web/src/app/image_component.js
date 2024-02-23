'use client'
import { useState, useEffect } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Image from 'next/image';
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../../config';
import styles from './image_component.module.css';

export default function ImageUploadComponent({ photos, setPhotos, setImageErrors }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  // Reset photos on component mount
  useEffect(() => {
    setPhotos([]);
  }, []);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;
    
    try {
      const base64Array = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          // If it's a picture file, convert it to base64
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            base64Array.push(reader.result);
            if (base64Array.length === files.length) {
              setPhotos((prevPhotos) => [...prevPhotos, ...base64Array]);
              setImages((prevImages) => [...prevImages, ...files]);
            }
          };
          setError(false);
          setImageErrors('');
        } else {
          setError(true);
          setImageErrors(`${file.name} is not a picture file.`);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };  

  const removeImage = (index, e) => {
    e.preventDefault();
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <main className="w-96">
      <div className="flex overflow-x-auto">
        {images.map((image, index) => (
          <div key={index} className={`relative flex-shrink-0 flex justify-center m-1 ${styles.imageContainer}`}>
            <button
              className="absolute top-1 right-1 text-black bg-white p-[1px] rounded-md z-10 hover:transition-all hover:scale-110 duration-300"
              onClick={(e) => removeImage(index, e)}
            >
              <RxCross1 />
            </button>
            <div className='relative w-[100px] h-[100px]'>
              <Image
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
                width={100}
                height={100}
                className='rounded-lg object-cover w-full h-full'
                loading='lazy'
              />
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 flex justify-center m-6">
          <label htmlFor="imageUpload" className="cursor-pointer pt-1.5">
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
              multiple
            />
            <div className={`bg-gray-200 p-4 rounded-lg hover:transition-all hover:scale-110 duration-300 ${error ? 'bg-red-500' : ''}`}>
              <BsPlusLg className={error ? 'text-white' : 'text-black'} />
            </div>
          </label>
        </div>
      </div>
    </main>
  );
}
