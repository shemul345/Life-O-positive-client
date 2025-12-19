import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaPlus, FaRegEye, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../components/Loader/Loader';
import Swal from 'sweetalert2';

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const size = 10;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['blogs', filter, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/blogs?status=${filter}&page=${currentPage}&size=${size}`);
            return res.data;
        }
    });

    const blogs = data?.result || [];
    const totalCount = data?.count || 0;
    const numberOfPages = Math.ceil(totalCount / size);
    const pages = [...Array(numberOfPages).keys()];

    const handleStatusToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
        const actionText = newStatus === 'published' ? 'Publish' : 'Unpublish';

        try {
            const res = await axiosSecure.patch(`/blogs/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${actionText}ed successfully!`,
                    text: `Content is now ${newStatus}.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch {
            Swal.fire('Error', 'Failed to update status', 'error');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This content will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/blogs/${id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire('Deleted!', 'Blog has been removed.', 'success');
                    }
                } catch {
                    Swal.fire('Error', 'Could not delete the blog', 'error');
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-base-200 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-neutral uppercase tracking-tight">
                        Content <span className="text-red-600">Manager</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Manage all blood donation articles</p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(0);
                        }}
                        value={filter}
                        className="select select-bordered font-bold text-gray-600 rounded-xl"
                    >
                        <option value="all">All Blogs</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    <Link to="/dashboard/content-management/add-blog" className="btn btn-neutral rounded-xl flex items-center gap-2 px-6">
                        <FaPlus /> Add Blog
                    </Link>
                </div>
            </div>

            {/* Blogs Grid */}
            {blogs.length === 0 ? (
                <div className="text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold text-xl uppercase tracking-widest">No Blogs Found</p>
                </div>
            ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className={`card shadow-sm hover:shadow-md transition-all flex flex-col rounded-[32px] overflow-hidden border ${blog.status === 'draft'
                                        ? 'bg-amber-50 border-amber-200'
                                        : 'bg-base-100 border-base-200'  
                                    }`}
                            >
                                <figure className="h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={blog.thumbnail || blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </figure>
                                <div className="card-body p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-3 gap-2">
                                        <h2 className="card-title text-lg font-bold leading-tight line-clamp-2">{blog.title}</h2>
                                        <span className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-warning'} p-3 font-bold text-[10px] uppercase text-white`}>
                                            {blog.status}
                                        </span>
                                    </div>

                                    <div
                                        className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    ></div>

                                    <div className="card-actions justify-end mt-auto border-t pt-4 gap-2">
                                        {/* Publish Toggle Button */}
                                        <button
                                            onClick={() => handleStatusToggle(blog._id, blog.status)}
                                            className={`btn btn-sm btn-ghost ${blog.status === 'draft' ? 'text-green-600' : 'text-orange-400'}`}
                                            title={blog.status === 'draft' ? 'Publish' : 'Draft'}
                                        >
                                            {blog.status === 'draft' ? <FaCheckCircle size={22} /> : <FaTimesCircle size={22} />}
                                        </button>

                                        {/* View Link */}
                                        <Link to={`/blog/${blog._id}`} className="btn btn-sm btn-ghost text-blue-500" title="View Details">
                                            <FaRegEye size={22} />
                                        </Link>

                                        {/* Delete Button */}
                                        <button onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-ghost text-red-500" title="Delete">
                                            <FaTrashAlt size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            )}

            {/* Pagination Controls */}
            {numberOfPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className="btn btn-sm btn-outline rounded-lg"
                    >Prev</button>

                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm rounded-lg ${currentPage === page ? 'btn-neutral' : 'btn-outline'}`}
                        >
                            {page + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(numberOfPages - 1, prev + 1))}
                        disabled={currentPage === numberOfPages - 1}
                        className="btn btn-sm btn-outline rounded-lg"
                    >Next</button>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;