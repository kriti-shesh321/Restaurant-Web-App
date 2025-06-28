import { useLocation, Link } from 'react-router-dom';

const OrderSuccess = () => {
    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn || false;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex justify-center mb-6">
                <div className="size-24 rounded-full border-4 border-green-600 flex items-center justify-center animate-scale-up">
                    <svg
                        className="size-20 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={4}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-green-700 mb-4">Order Confirmed!</h1>
                <p className="text-gray-700 mb-6">Thank you for ordering. Your delicious meal is being prepared.</p>
            </div>
            <div className="w-[70%] flex justify-center gap-4 text-center font-medium text-lg">
                <Link to="/" className="min-w-32 p-2 text-maroon border-2 border-maroon hover:shadow-lg">Home</Link>
                {isLoggedIn && <Link to="/orders" className="min-w-32 p-2 text-white bg-maroon hover:shadow-lg">View Orders</Link>}
            </div>
        </div>
    );
};
export default OrderSuccess;