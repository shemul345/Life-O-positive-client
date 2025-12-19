import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AddBlog = () => {
    const editor = useRef(null);
    const { register, handleSubmit, reset } = useForm();
    const [content, setContent] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start writing your blood donation awareness blog...',
        height: 400,
        toolbarSticky: false,
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'brush', 'font', 'fontsize', '|',
            'ul', 'ol', '|',
            'link', 'table', '|',
            'undo', 'redo', 'fullsize'
        ],
    }), []);

    const onSubmit = async (data) => {
        if (!content || content.length < 20) {
            return Swal.fire('Error', 'Please write at least a few sentences!', 'error');
        }

        const blogInfo = {
            title: data.title,
            image: data.image,
            content: content,
            status: 'draft',
            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post('/blogs', blogInfo);
            if (res.data.insertedId) {
                reset();
                setContent('');
                Swal.fire({
                    icon: 'success',
                    title: 'Blog Created!',
                    text: 'Your blog is saved as a draft.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/content-management');
            }
        } catch {
            Swal.fire('Error', 'Could not save the blog.', 'error');
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
                    Create New <span className="text-red-600">Blog</span>
                </h1>
                <p className="text-gray-400 mt-2 font-medium">Spread awareness through your words.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Blog Title */}
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Blog Title</label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            placeholder="Enter a catchy title"
                            className="input input-bordered rounded-2xl w-full focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        />
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Thumbnail Image URL</label>
                        <input
                            type="text"
                            {...register("image", { required: true })}
                            placeholder="https://image-link.com"
                            className="input input-bordered rounded-2xl w-full focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label font-bold text-gray-700">Content</label>
                    <div className="rounded-2xl overflow-hidden border border-gray-300">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            onBlur={newContent => setContent(newContent)} // পারফরম্যান্সের জন্য onBlur ব্যবহার করা ভালো
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="btn btn-neutral px-12 rounded-2xl text-lg font-bold bg-gray-900 hover:bg-black text-white">
                        Save Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;