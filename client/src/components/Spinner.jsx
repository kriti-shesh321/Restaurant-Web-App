import BarLoader from 'react-spinners/BarLoader';

const Spinner = ({ loading }) => {
    return (
        <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center">
            <BarLoader
                color="green"
                loading={loading}
                height={5}
                width={200}
                speedMultiplier={2}
            />
        </div>
    );
};

export default Spinner;