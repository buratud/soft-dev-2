import { AiOutlineUser, AiOutlineHome, AiOutlineTag, AiOutlineEnvironment, AiOutlineBank } from 'react-icons/ai';
import { BsBuildings, Bs123, BsHouse } from "react-icons/bs";

export default function AddDormPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-f6f6fb">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-092F88 font-bold text-5xl font-Poppins mb-8">List New Property</div>
        <div className="flex justify-center w-full">
          <form className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex flex-col w-full font-Poppins">
              <div>Tell us your property name.</div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-D9D9D9">
                <BsBuildings className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-000000 w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Name" className="input-field ml-1 flex-grow border-none bg-D9D9D9 focus:outline-none font-medium" />
              </div>
              <div className='pt-6'>Where is the property you are listing?</div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineHome className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-000000 w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Street Address" className="input-field ml-2 flex-grow border-none bg-D9D9D9 focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-D9D9D9">
                <BsHouse className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-000000 w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Property Number" className="input-field ml-2 flex-grow border-none bg-D9D9D9 focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineEnvironment className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-000000 w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="City" className="input-field ml-2 flex-grow border-none bg-D9D9D9 focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineEnvironment className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-000000 w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Province" className="input-field ml-2 flex-grow border-none bg-D9D9D9 focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-D9D9D9">
                <Bs123 className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-000000 w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="Zip Code" className="input-field ml-2 flex-grow border-none bg-D9D9D9 focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineTag className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-000000 w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" placeholder="How much do you want to charge per month?" className="input-field ml-2 flex-grow border-none bg-D9D9D9 focus:outline-none font-medium" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
