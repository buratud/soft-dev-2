'use client'
import { useState } from 'react';
import Image from 'next/image';
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../../config';

export default function ImageUploadComponent() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      // Logic to upload image to server (axios.post, fetch, etc.)
      // Once uploaded, you can update the state with the new image URLs
      // For now, let's just add a placeholder image URL
      setImages([...images, URL.createObjectURL(file)]);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="w-full">
      <div className="flex overflow-x-auto">
        {images.map((imageUrl, index) => (
          <div key={index} className="flex-shrink-0 flex justify-center m-6">
            <Image src={imageUrl} alt={`Image ${index + 1}`} className="rounded-2xl" width={100} height={100} />
          </div>
        ))}
        {images.length < 40 && (
          <div className="flex-shrink-0 flex justify-center m-6">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
                disabled={uploading}
              />
              {uploading ? (
                <div className="bg-gray-200 p-4 rounded-lg">Uploading...</div>
              ) : (
                <div className="bg-gray-200 p-4 rounded-lg">Upload Image</div>
              )}
            </label>
          </div>
        )}
      </div>
    </main>
  );
}
