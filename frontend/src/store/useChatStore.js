import  {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';


export const useChartStore = create((set,get) => ({
    messgae : [],
    user : [],
    selectedUUser : null,
    isUserLoading : false,
    isMessageLoading : false,


    getUsers : async () => {
        set({isUserLoading : true});
        try {
            const res = await axiosInstance.get('/messages/users');
            set({user : res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUserLoading : false});
        }
    },
    getMessages : async (userId) => {
        set({isMessageLoading : true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({message : res.data, selectedUser : userId});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessageLoading : false});
        }
    },

    sendMessage : async (messageData) => {
    const {selectedUser , messages} = get();
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
        set({messages : [...messages, res.data]});
    
    }catch(error){
        toast.error(error.response.data.message);
    }},
    setSelectedUser : (selectedUser) => set({selectedUser}),
}));