
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="container mx-auto w-5xl min-h-screen flex items-center justify-center bg-green-50 px-6">
            <div className="text-center">
                {/* 404 */}
                <h1 className="text-8xl md:text-9xl font-extrabold text-green-600 tracking-tight">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 max-w-md mx-auto text-gray-600 text-lg">
                    Sorry, the page you are looking for doesn&apos;t exist or
                    may have been moved.
                </p>

                {/* Button */}
                <Link
                    href="/"
                    className="inline-block mt-8 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-200 shadow-md"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;

