import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loader from '../../components/Loader/Loader';

const ContentPage = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(0);
    const size = 10;

    const { data, isLoading } = useQuery({
        queryKey: ['publishedBlogs', currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blogs?status=published&page=${currentPage}&size=${size}`);
            return res.data;
        }
    });

    const blogs = data?.result || [];
    const totalCount = data?.count || 0;
    const numberOfPages = Math.ceil(totalCount / size);
    const pages = [...Array(numberOfPages).keys()];

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto my-16 px-4 min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase mb-3 text-gray-800">
                    Health & <span className="text-red-600">Blood</span> Insights
                </h1>
                <p className="text-gray-500 font-medium max-w-lg mx-auto">
                    Stay updated with the latest news, health tips, and blood donation stories.
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div key={blog._id} className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
                            {/* Thumbnail Fix: thumbnail অথবা image যেকোনোটি থাকলে দেখাবে */}
                            <div className="relative h-56 overflow-hidden bg-gray-100">
                                <img
                                    src={blog.thumbnail || blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                        News
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[56px]">
                                    {blog.title}
                                </h2>

                                <div
                                    className="text-gray-500 text-sm line-clamp-3 mb-6"
                                    dangerouslySetInnerHTML={{ __html: blog.content?.substring(0, 150) + "..." }}
                                ></div>

                                <Link
                                    to={`/blog/${blog._id}`}
                                    className="btn btn-neutral w-full rounded-2xl font-bold bg-gray-900 border-none hover:bg-red-600 text-white transition-colors"
                                >
                                    Read Full Article
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold text-xl uppercase tracking-widest">No Published Content Yet</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {numberOfPages > 1 && (
                <div className="flex justify-center mt-16 gap-3">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className="btn btn-circle border-gray-200 bg-white hover:bg-red-600 hover:text-white disabled:opacity-30"
                    >
                        ❮
                    </button>

                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-circle font-bold transition-all ${currentPage === page
                                ? 'bg-red-600 text-white border-none scale-110 shadow-lg shadow-red-200'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-red-600'
                                }`}
                        >
                            {page + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(numberOfPages - 1, prev + 1))}
                        disabled={currentPage === numberOfPages - 1}
                        className="btn btn-circle border-gray-200 bg-white hover:bg-red-600 hover:text-white disabled:opacity-30"
                    >
                        ❯
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContentPage;