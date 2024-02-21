import { AiOutlineHome, AiOutlineTag, AiOutlineEnvironment } from 'react-icons/ai';
import { BsBuildings, Bs123, BsHouse } from "react-icons/bs";

export default function AddDormPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#F6F6FB]">
        <div className="">
          <form className="flex flex-col md:flex-row gap-36 font-Poppins w-full">
            <div className="flex flex-col w-full">
              <div className="text-bg-[#092F88] font-bold text-4xl font-Poppins mb-4">List New Property</div>
              <div>Tell us your property name.</div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <BsBuildings className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Name" className="input-field ml-1 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className='pt-6'>Where is the property you are listing?</div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <AiOutlineHome className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Street Address" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <BsHouse className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Property Number" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <AiOutlineEnvironment className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="City" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <AiOutlineEnvironment className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Province" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <Bs123 className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Zip Code" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
            </div>
            

            <div className="w-full">
            {/* <ImageUploadComponent /> */}
              <div className='pt-6'>What facilities and filters do your property provide?</div>
              <div className='flex flex-row gap-4 py-2 my-2'>
                <div className="flex flex-col gap-4 py-2 my-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Air-Conditioner
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Elevator
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Near Bus Stop
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Near Restaurants
                  </label>
                </div>

                <div className="flex flex-col gap-4 py-2 my-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Free WiFi
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Pet-friendly
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Near Shopping Malls
                  </label>
                </div>
              </div>

              <div>
                <div>How much do you want to charge per month?</div>
                <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <AiOutlineTag className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Price per month (in THB)" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-8 pb-16">
            <button className="bg-[#092F88] font-bold text-[#FFFFFF] px-6 py-2 rounded-2xl mr-4">Add Your Property</button>
            <button className="bg-[#C10206] font-bold text-[#FFFFFF] px-6 py-2 rounded-2xl">Cancel</button>
          </div>
        </div>
    </main>
  );
}
