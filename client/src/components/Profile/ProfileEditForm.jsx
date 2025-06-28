import { useState } from 'react';

const ProfileEditForm = ({ userData, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: userData.name || '',
        email: userData.email || '',
        profileImage: userData.profileImage || '',
        password: userData.password || '',
    });

    const handleChange = (e) => {
        if (e.target.name === 'profileImage') {
            setFormData({ ...formData, profileImage: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label htmlFor="image">Image +</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="profileImage"
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-5 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-2 rounded"
                        placeholder="Name"
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border p-2 rounded"
                        placeholder="Email"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full bg-gray-50 border p-2 rounded"
                        placeholder="Leave blank to keep current password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">
                    Save
                </button>
            </form>
        </div>
    );
};
export default ProfileEditForm;