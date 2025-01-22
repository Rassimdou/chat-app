import {useChartStore} from '../store/useChatStore';
import {useEffect} from 'react';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './skeletons/MessageSkeleton';
import MessageInput from './MessageInput';
const ChatContainer = () => {
const {messages, getMessages , isMessagesLoading , selectedUser} = useChartStore();

useEffect(() => {
  getMessages(selectedUser.id);
}, [selectedUser.id], getMessages);


if(isMessagesLoading){return (
<div className='flex-1 flex flex-col overflow-auto'>
  <ChatHeader />    
  <MessageSkeleton />
  <MessageInput />
</div> 
)}

return (
<div className='flex-1 flex flex-col overflow-auto'>
<ChatHeader />
<p>messages...</p>
<MessageInput />
</div>
)
}
