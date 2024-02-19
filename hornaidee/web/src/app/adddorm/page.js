export default function AddDormPage() {
  return (
    <main>
      <div className="text-092F88 font-bold text-5xl font-Poppins">
        List New Property
      </div>
      <div className="flex justify-center items-center h-screen">
        <form className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col w-full md:w-1/2">
            <input type="text" placeholder="Name" className="input-field" />
            <input type="text" placeholder="Street Address" className="input-field" />
            <input type="text" placeholder="Property Number" className="input-field" />
            <input type="text" placeholder="City" className="input-field" />
            <input type="text" placeholder="Province" className="input-field" />
            <input type="text" placeholder="Zip Code" className="input-field" />
            <input type="text" placeholder="How much do you want to charge per month?" className="input-field" />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            {/* <ImageUploadComponent /> */}
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Air-Conditioner
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Free WiFi
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Elevator
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Pet-friendly
              </label>
            </div>
          </div>
          <div className="flex flex-col w-full mt-8 md:w-1/2 md:ml-auto">
            <button type="button" className="btn-primary mr-4">Add your property</button>
            <button type="button" className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
      </main>
  );
}