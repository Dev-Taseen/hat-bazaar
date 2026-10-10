


const LoadingPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="text-center">
                {/* Spinner */}
                <div className="w-12 h-12 mx-auto border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

                {/* Loading Text */}
                <p className="mt-5 text-lg font-semibold text-green-600">
                    Loading...
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    Please wait a moment
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;

