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

    // ডাটা ফেচিং
    const { data: blogs = [], isLoading, refetch } = useQuery({
        queryKey: ['blogs', filter],
        queryFn: async () => {
            const res = await axiosSecure.get(`/blogs?status=${filter}`);
            return res.data;
        }
    });

    // ব্লগ স্ট্যাটাস আপডেট (Publish/Unpublish)
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/blogs/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `Blog ${newStatus === 'published' ? 'Published' : 'Drafted'} successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch {
            Swal.fire('Error', 'Failed to update status', 'error');
        }
    };

    // ব্লগ ডিলিট
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/blogs/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-base-200">
            {/* Upper Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-neutral uppercase tracking-tight">Content <span className="text-red-600">Manager</span></h1>
                    <p className="text-gray-500 font-medium">Create and manage blogs/articles for Life O+</p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        className="select select-bordered font-bold text-gray-600 rounded-xl"
                    >
                        <option value="all">All Blogs</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    <Link to="/dashboard/content-management/add-blog" className="btn btn-neutral rounded-xl flex items-center gap-2">
                        <FaPlus /> Add Blog
                    </Link>
                </div>
            </div>

            {/* Content Table/Cards */}
            {blogs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
                    <p className="text-gray-400 font-bold text-xl">No content found. Start by adding a blog!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                            <figure className="h-48 overflow-hidden bg-gray-200">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            </figure>
                            <div className="card-body p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="card-title text-lg font-bold leading-tight">{blog.title}</h2>
                                    <div className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-ghost'} p-3 font-bold text-[10px] uppercase`}>
                                        {blog.status}
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.content }}></p>

                                <div className="card-actions justify-end mt-4 border-t pt-4">
                                    {/* Action Buttons */}
                                    {blog.status === 'draft' ? (
                                        <button onClick={() => handleStatusUpdate(blog._id, 'published')} className="btn btn-sm btn-ghost text-green-600" title="Publish">
                                            <FaCheckCircle size={18} />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleStatusUpdate(blog._id, 'draft')} className="btn btn-sm btn-ghost text-orange-400" title="Make Draft">
                                            <FaTimesCircle size={18} />
                                        </button>
                                    )}

                                    <Link to={`/blog/${blog._id}`} className="btn btn-sm btn-ghost text-blue-500" title="View">
                                        <FaRegEye size={18} />
                                    </Link>

                                    <button onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-ghost text-red-500" title="Delete">
                                        <FaTrashAlt size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentManagement;