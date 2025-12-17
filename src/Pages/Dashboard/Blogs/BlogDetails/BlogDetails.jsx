import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import Loader from '../../../../components/Loader/Loader';

const BlogDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: blog = {}, isLoading } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blogs/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            {/* Blog Cover Image */}
            <div className="h-[400px] w-full overflow-hidden rounded-2xl mb-8">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Title & Metadata */}
            <h1 className="text-4xl font-black text-gray-900 mb-4">{blog.title}</h1>
            <div className="flex gap-4 mb-8">
                <span className="badge badge-error p-3 text-white font-bold">{blog.status}</span>
                <span className="text-gray-400 font-medium">Published on: {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>

            <hr className="my-8 opacity-10" />

            {/* Blog Content (HTML rendering) */}
            <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </div>
    );
};

export default BlogDetails;