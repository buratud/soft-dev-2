import { AiOutlineUser, AiOutlineHome, AiOutlineTag, AiOutlineEnvironment, AiOutlineBank } from 'react-icons/ai';

export default function AddDormPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-092F88 font-bold text-5xl font-Poppins mb-8">List New Property</div>
        <div className="flex justify-center w-full">
          <form className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex flex-col w-full">
              <div className="flex items-center border py-2 my-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineUser className="input-icon ml-2" />
                <input type="text" placeholder="Name" className="input-field ml-2 flex-grow border-none focus:outline-none" />
              </div>
              <div className="flex items-center border py-2 my-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineHome className="input-icon ml-2" />
                <input type="text" placeholder="Street Address" className="input-field ml-2 flex-grow border-none focus:outline-none" />
              </div>
              <div className="flex items-center border py-2 my-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineTag className="input-icon ml-2" />
                <input type="text" placeholder="Property Number" className="input-field ml-2 flex-grow border-none focus:outline-none" />
              </div>
              <div className="flex items-center border py-2 my-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineEnvironment className="input-icon ml-2" />
                <input type="text" placeholder="City" className="input-field ml-2 flex-grow border-none focus:outline-none" />
              </div>
              <div className="flex items-center border py-2 my-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineEnvironment className="input-icon ml-2" />
                <input type="text" placeholder="Province" className="input-field ml-2 flex-grow border-none focus:outline-none" />
              </div>
              <div className="flex items-center border py-2 my-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineBank className="input-icon ml-2" />
                <input type="text" placeholder="Zip Code" className="input-field ml-2 flex-grow border-none focus:outline-none" />
              </div>
              <div className="flex items-center border py-2 my-2 rounded-2xl select-none bg-D9D9D9">
                <AiOutlineTag className="input-icon ml-2" />
                <input type="text" placeholder="How much do you want to charge per month?" className="input-field ml-2 flex-grow border-none focus:outline-none" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
