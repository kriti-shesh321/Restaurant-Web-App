import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";

const UserProfilePage = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] font-text1 mx-10 lg:mx-40 md:my-20 lg:min-h-[500px] md:w-[500px] lg:w-auto shadow-lg border">
        <div className="bg-red-900 text-white flex flex-col justify-between items-center py-10 lg:py-32">
          <img
            src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
            alt="placeholder user image"
            className="size-16 md:size-28 lg:size-32 rounded-full"
          />
          <div className="text-xl font-bold">Firstname Lastname</div>
          <div className="text-sm font-medium">Joined: 12th Jan 2024</div>
          <div className="pt-3">
            <button type="button" className="flex gap-3 items-center border px-3 py-1 text-sm hover:shadow hover:bg-red-950">Edit Profile <FaEdit /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center px-10 lg:px-20 py-5">

          <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-gray-500 border-b">Information</h1>
            <div className="grid grid-cols-2 text-lg">
              <div>
                <h2 className="font-bold">Email</h2>
                <p className="text-gray-500">test@test.com</p>
              </div>
              <div>
                <h2 className="font-bold">Phone</h2>
                <p className="text-gray-500">+91 xxxxxxxxxx</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 mt-5 lg:mt-0">
            <h1 className="text-2xl font-medium text-gray-500 border-b">My Addresses</h1>
            <div className="flex flex-wrap flex-row gap-3 md:gap-5">
              <div className="w-full">
                <button className="size-fit lg:w-38 border border-maroon px-3 text-gray-700 font-semi-bold hover:text-gray-500">
                  <FaPlusCircle className="inline mr-2" />
                  <span>Add</span>
                </button>
              </div>
              <div className="w-full md:w-44 h-auto border max-h-fit px-2 py-1">
                <div>
                  <h2 className="font-medium ">Home</h2>
                  <p className="text-gray-500">Flat xxx, xxx Apartments, xxx, yyy, Canada</p>
                </div>
                <div className="flex gap-2 text-gray-500 text-xs mt-3">
                  <button type="button" className="flex gap-1 items-center border-b border-blue-500 hover:text-blue-500">Edit<FaEdit /></button>
                  <button type="button" className="flex gap-1 items-center border-b border-red-500 hover:text-red-500">Delete <FaTrashAlt /></button>
                </div>
              </div>
              <div className="w-full md:w-44 h-auto border max-h-fit px-2 py-1">
                <div>
                  <h2 className="font-medium ">Work</h2>
                  <p className="text-gray-500">Building xxx, xx, yyy, India</p>
                </div>
                <div className="flex gap-2 text-gray-500 text-xs mt-3">
                  <button type="button" className="flex gap-1 items-center border-b border-blue-500 hover:text-blue-500">Edit<FaEdit /></button>
                  <button type="button" className="flex gap-1 items-center border-b border-red-500 hover:text-red-500">Delete <FaTrashAlt /></button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button type="button" className="border-b border-maroon px-1 text-gray-500 text-sm font-semibold hover:text-red-500 hover:shadow mt-10 lg:mt-0">Delete Account</button >
          </div>

        </div>

      </div>
    </section>
  );
};
export default UserProfilePage;