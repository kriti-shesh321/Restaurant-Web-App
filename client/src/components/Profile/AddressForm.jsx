import { useState } from "react";

const AddressForm = ({ addressData = {}, onSubmit }) => {
    const [formData, setFormData] = useState({
        type: addressData?.type || 'Home',
        address: addressData?.address || '',
        city: addressData?.city || '',
        state: addressData?.city || '',
        country: addressData?.country || '',
        zipCode: addressData?.zipCode || '',
        contact: addressData?.contact || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-3">

                <div>
                    <label htmlFor="addressLine1">Type<span className="text-red-500 mr-5">*</span></label>
                    <select
                        htmlFor="type"
                        className="bg-white border px-2"
                        value={formData.type}
                        name="type"
                        onChange={handleChange}
                    >
                        <option value='Home'>Home</option>
                        <option value='Work'>Work</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="address">Address<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="city">City<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="state">State<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="country">Country<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="zipCode">Zipcode<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="contact">Phone</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-2 rounded"
                    />
                </div>

                <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">
                    Save
                </button>
            </form>
        </div>
    );
};
export default AddressForm;