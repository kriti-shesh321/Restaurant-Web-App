import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlusCircle, FaEdit, FaTrashAlt, FaRegWindowClose, FaSignOutAlt, FaArrowCircleRight } from "react-icons/fa";
import AuthContext from "../context/Auth/AuthContext";
import { formatReadableDate } from "../utils/formatDate";
import DeliveryAddressContext from "../context/Auth/DeliveryAddressContext.jsx";
import ProfileEditForm from "../components/Profile/ProfileEditForm.jsx";
import AddressForm from "../components/Profile/AddressForm.jsx";
import Spinner from "../components/Spinner.jsx";

const UserProfilePage = () => {
  const { getUser, updateUser, deleteUser, logout } = useContext(AuthContext);
  const { getDeliveryAddresses, addDeliveryAddress, editDeliveryAddress, deleteDeliveryAddress } = useContext(DeliveryAddressContext);

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const [user, addressList] = await Promise.all([
          getUser(),
          getDeliveryAddresses()
        ]);
        setUserData(user);
        setAddresses(addressList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, [refreshFlag]);

  const editUser = async (formData) => {
    try {
      const updatedData = { ...formData };
      if (!formData.password) {
        delete updatedData.password;
      }
      await updateUser(updatedData);
      setShowEditForm(false);
      setRefreshFlag(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account?');
    if (!confirm) return;
    const deleteAccount = async () => {
      try {
        await deleteUser();
        navigate('/');
      } catch (error) {
        console.error("Error deleting account.", error);
      }
    };
    deleteAccount();
  };

  const handleLogout = async () => {
    const logoutUser = async () => {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error("Error logging out.");
      }
    };
    logoutUser();
  };

  const handleAddressFormSubmit = async (newAddress) => {
    try {
      if (editingAddress) {
        editDeliveryAddress(editingAddress.id, newAddress);
      } else {
        await addDeliveryAddress(newAddress);
      }
      setShowAddressForm(false);
      setEditingAddress(null);
      setRefreshFlag(prev => !prev);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleAddressDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this address?');
    if (!confirm) return;
    try {
      await deleteDeliveryAddress(id);
      setRefreshFlag(prev => !prev);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  if (loading) return <Spinner />;

  return (
    userData &&
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] font-text1 md:mx-auto lg:mx-40 lg:my-10 lg:min-h-[500px] md:w-[600px] lg:w-auto shadow-lg border">

        <div className="bg-red-900 text-white flex flex-col justify-between items-center gap-y-3 py-10 lg:py-40">
          <img
            src={userData.profileImage ? userData.profileImage : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="}
            alt="user image"
            className="size-16 md:size-28 lg:size-32 rounded-full"
          />
          <div className="text-xl lg:text-2xl font-bold">{userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}</div>
          <div className="text-sm lg:text-lg font-medium">Joined: {formatReadableDate(userData.createdAt)}</div>
          <div className="flex gap-5">
            <button
              className="flex gap-3 items-center border px-3 py-1 hover:shadow hover:bg-red-950"
              onClick={() => setShowEditForm(true)}
            >
              Edit Profile <FaEdit />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex gap-3 items-center border px-3 py-1 bg-white text-black font-medium hover:shadow hover:bg-red-950 hover:text-white"
            >
              <span>Logout</span> <FaSignOutAlt />
            </button >
          </div>

          {showEditForm && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
              <div className="min-h-[50%] bg-white relative p-5 rounded shadow-lg w-full max-w-md text-black">

                <button className="absolute top-5 right-5 text-xl" onClick={() => setShowEditForm(false)}><FaRegWindowClose /></button>

                <ProfileEditForm
                  userData={userData}
                  onSubmit={editUser}
                />
              </div>
            </div>
          )}

        </div>

        <div className="grid grid-cols-1 items-center px-10 lg:px-20 py-5 space-y-8">

          <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-gray-500 border-b">Information</h1>
            <div className="grid md:grid-cols-2 text-lg">
              <div>
                <h2 className="font-bold">Email</h2>
                <p className="text-gray-500">{userData?.email}</p>
              </div>
              <div>
                <h2 className="font-bold">Phone</h2>
                <p className="text-gray-500">{userData.phone ? userData.phone : "-"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:mt-0">
            <h1 className="text-2xl font-medium text-gray-500 border-b">My Addresses</h1>
            <div className="flex flex-wrap flex-row gap-3 md:gap-5">
              <div className="w-full">
                <button onClick={() => setShowAddressForm(true)} className="size-fit lg:w-38 border border-maroon px-3 text-gray-700 font-semi-bold hover:text-gray-500">
                  <FaPlusCircle className="inline mr-2" />
                  <span>Add</span>
                </button>
              </div>

              {addresses && addresses.length > 0 &&
                addresses.map((address) => (
                  <div key={address.id} className="w-full md:w-44 h-auto border max-h-fit px-2 py-1">
                    <div>
                      <h2 className="font-medium ">{address.type}</h2>
                      <p className="text-gray-700">({address.contact})</p>
                      <p className="text-gray-500">{address.address}, {address.city}, {address.state}, {address.country}</p>
                      <p className="text-gray-500">{address.zipCode}</p>
                    </div>
                    <div className="flex gap-2 text-gray-500 text-xs mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(true);
                          setEditingAddress(address);
                        }}
                        className="flex gap-1 items-center border-b border-blue-500 hover:text-blue-500"
                      >
                        Edit<FaEdit />
                      </button>
                      <button type="button" onClick={() => handleAddressDelete(address.id)} className="flex gap-1 items-center border-b border-red-500 hover:text-red-500">Delete <FaTrashAlt /></button>
                    </div>
                  </div>
                )
                )}

              {showAddressForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
                  <div className="min-h-[50%] bg-white relative p-5 rounded shadow-lg w-full max-w-md text-black">

                    <button className="absolute top-5 right-5 text-xl" onClick={() => setShowAddressForm(false)}><FaRegWindowClose /></button>

                    <AddressForm
                      addressData={editingAddress}
                      onSubmit={handleAddressFormSubmit}
                    />

                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="text-2xl font-medium text-gray-500 border-b">
            <Link to="/orders" className="flex gap-5 items-center hover:shadow-sm hover:underline hover:text-green-700">My Orders <FaArrowCircleRight className="text-green-700 text-3xl" /></Link>
          </div>

          <div>
            <button type="button" onClick={handleDelete} className="border-b border-maroon px-1 text-gray-500 text-sm font-semibold hover:text-red-500 hover:shadow mt-10 lg:mt-0">Delete Account</button >
          </div>

        </div>

      </div>
    </section>
  );
};
export default UserProfilePage;