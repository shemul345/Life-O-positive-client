import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://life-o-positive-server.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;