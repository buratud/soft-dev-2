'use client'
import { useState, useEffect } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Image from 'next/image';
import styles from './image_component.module.css';

export default function ImageUploadComponent({ photos: initialPhotos, setPhotos, setImageErrors }) {
  const [photos, setLocalPhotos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLocalPhotos(initialPhotos);
  }, [initialPhotos]);

  useEffect(() => {
    const convertPhotosToBase64 = async () => {
      const base64Photos = await Promise.all(initialPhotos.map(async (photo) => {
        if (typeof photo === 'string') {
          // If photo is a URL, convert it to base64
          const base64 = await imageUrlToBase64(photo);
          return base64;
        } else {
          return photo;
        }
      }));
      setLocalPhotos(base64Photos);
    };
    convertPhotosToBase64();
  }, [initialPhotos]);

  async function imageUrlToBase64(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
  
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  }  

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;
  
    try {
      const base64Array = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            base64Array.push(reader.result);
            // Check if all files have been processed
            if (base64Array.length === files.length) {
              setPhotos((prevPhotos) => [...prevPhotos, ...base64Array]); // Concatenate new images with previous ones
              setLocalPhotos((prevPhotos) => [...prevPhotos, ...base64Array]);
            }
          };
          reader.readAsDataURL(file); // Read file as base64
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
  
    const updatedLocalPhotos = [...photos];
    updatedLocalPhotos.splice(index, 1);
    setLocalPhotos(updatedLocalPhotos);
  };

  return (
    <main className="w-96">
      <div className="flex overflow-x-auto">
        {photos.map((photo, index) => (
          <div key={index} className={`relative flex-shrink-0 flex justify-center m-1 ${styles.imageContainer}`}>
            <button
              className="absolute top-1 right-1 text-black bg-white p-[1px] rounded-md z-10 hover:transition-all hover:scale-110 duration-300"
              onClick={(e) => removeImage(index, e)}
            >
              <RxCross1 />
            </button>
            <div className='relative w-[100px] h-[100px]'>
              <Image
                src={photo}
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
