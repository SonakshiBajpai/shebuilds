'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Types
interface Chat {
  id: number;
  name: string;
  avatar: string | null;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  type: 'direct' | 'group';
  participants?: number;
}

interface Message {
  id: number;
  senderId: number | string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image';
  caption?: string;
}

// Mock chat data
const mockChats: Chat[] = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/profile1.jpg",
    lastMessage: "Hey! Are you free for a house meeting tonight?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    type: "direct"
  },
  {
    id: 2,
    name: "House Group 🏠",
    avatar: "/room1.jpg",
    lastMessage: "Sarah: Can someone please clean the kitchen?",
    timestamp: "15m ago",
    unread: 0,
    online: false,
    type: "group",
    participants: 6
  },
  {
    id: 3,
    name: "Ananya Patel",
    avatar: "/profile2.jpg",
    lastMessage: "Thanks for helping with the groceries!",
    timestamp: "1h ago",
    unread: 0,
    online: false,
    type: "direct"
  },
  {
    id: 4,
    name: "Cleaning Schedule 🧹",
    avatar: "/room5.jpg",
    lastMessage: "Meera: My turn this week, got it!",
    timestamp: "2h ago",
    unread: 1,
    online: false,
    type: "group",
    participants: 8
  },
  {
    id: 5,
    name: "Kavya Singh",
    avatar: "/profile4.jpg",
    lastMessage: "The WiFi password is updated in the group",
    timestamp: "3h ago",
    unread: 0,
    online: true,
    type: "direct"
  },
  {
    id: 6,
    name: "Movie Night 🎬",
    avatar: "/room8.jpg",
    lastMessage: "John: What about Friday 8 PM?",
    timestamp: "1d ago",
    unread: 0,
    online: false,
    type: "group",
    participants: 12
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    senderName: "Priya Sharma",
    message: "Hey John! Are you free for a quick chat?",
    timestamp: "17:05",
    type: "text"
  },
  {
    id: 2,
    senderId: "me",
    senderName: "You",
    message: "Sure! What's up?",
    timestamp: "17:06",
    type: "text"
  },
  {
    id: 3,
    senderId: 1,
    senderName: "Priya Sharma",
    message: "I wanted to discuss the house meeting tonight. Can you make it at 8 PM?",
    timestamp: "17:07",
    type: "text"
  },
  {
    id: 4,
    senderId: 1,
    senderName: "Priya Sharma",
    message: "/room1.jpg",
    timestamp: "17:08",
    type: "image",
    caption: "Also, I took this photo of the living room setup"
  },
  {
    id: 5,
    senderId: "me",
    senderName: "You",
    message: "Yes, I'll be there! The setup looks great 👍",
    timestamp: "17:10",
    type: "text"
  }
];

export default function CommunityPage() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [chatMessages, setChatMessages] = useState<{[key: string]: Message[]}>({
    '1': mockMessages, // Priya Sharma
    '2': [
      { id: 1, senderId: '2', senderName: 'Emma Wilson', message: 'Hey! How are you settling in?', timestamp: '2:30 PM', type: 'text' },
      { id: 2, senderId: 'me', senderName: 'You', message: 'Great! The room is perfect. Thanks for helping me move in yesterday!', timestamp: '2:32 PM', type: 'text' },
      { id: 3, senderId: '2', senderName: 'Emma Wilson', message: 'No problem! Want to grab dinner together tonight?', timestamp: '2:35 PM', type: 'text' }
    ], // House Group
    '3': [
      { id: 1, senderId: '3', senderName: 'Alex Chen', message: 'Movie night this Friday?', timestamp: '1:15 PM', type: 'text' },
      { id: 2, senderId: 'me', senderName: 'You', message: 'Count me in! What are we watching?', timestamp: '1:20 PM', type: 'text' },
      { id: 3, senderId: '3', senderName: 'Alex Chen', message: 'How about the new Marvel movie?', timestamp: '1:22 PM', type: 'text' }
    ], // Emma Wilson
    '4': [
      { id: 1, senderId: '4', senderName: 'Maya Patel', message: 'Anyone free to help me assemble my desk?', timestamp: '11:30 AM', type: 'text' },
      { id: 2, senderId: 'me', senderName: 'You', message: 'I can help! What time works for you?', timestamp: '11:45 AM', type: 'text' }
    ], // Maya Patel
    '5': [
      { id: 1, senderId: 'me', senderName: 'You', message: 'Happy birthday!', timestamp: '9:00 AM', type: 'text' },
      { id: 2, senderId: '5', senderName: 'Ananya Gupta', message: 'Thank you so much!', timestamp: '9:15 AM', type: 'text' }
    ] // Ananya Gupta
  });
  const [newMessage, setNewMessage] = useState('');
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current chat messages
  const currentMessages = chatMessages[selectedChat.id.toString()] || [];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const getMockResponse = (userMessage: string, chat: Chat): Message => {
    const responseId = currentMessages.length + 2;
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    
    const responses = [
      "That sounds great!",
      "I agree with you on that.",
      "Let me think about it.",
      "Thanks for letting me know!",
      "Sure, no problem.",
      "That works for me."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: responseId,
      senderId: chat.id.toString(),
      senderName: chat.name,
      message: response,
      timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: currentMessages.length + 1,
      senderId: 'me',
      senderName: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
    
    setChatMessages(prev => ({
      ...prev,
      [selectedChat.id.toString()]: [...currentMessages, userMessage]
    }));
    setNewMessage('');
    
    // Generate mock response after a delay
    setTimeout(() => {
      const mockResponse = getMockResponse(newMessage, selectedChat);
      setChatMessages(prev => ({
        ...prev,
        [selectedChat.id.toString()]: [...(prev[selectedChat.id.toString()] || []), mockResponse]
      }));
    }, Math.random() * 3000 + 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageMessage: Message = {
        id: currentMessages.length + 1,
        senderId: 'me',
        senderName: 'You',
        message: e.target?.result as string,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'image'
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedChat.id.toString()]: [...currentMessages, imageMessage]
      }));

      // Mock response for image
      setTimeout(() => {
        const mockResponse = getMockResponse("Nice photo!", selectedChat);
        setChatMessages(prev => ({
          ...prev,
          [selectedChat.id.toString()]: [...(prev[selectedChat.id.toString()] || []), mockResponse]
        }));
      }, Math.random() * 4000 + 2000);
    };

    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const openImagePreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setShowImagePreview(true);
  };

  const handleMobileChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setShowMobileChat(true);
  };

  const handleMobileBackToList = () => {
    setShowMobileChat(false);
  };

  return (
    <div className="min-h-screen relative font-poppins">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: "url('/dashboard-background.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
        style={{
          backgroundImage: "url('/auth-background.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl mx-4 mt-6 mb-2 shadow-xl border border-white/30 sticky top-6 z-40">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link 
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors p-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Community</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Connect with your roommates</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="p-2 text-gray-600 hover:text-[#7D3EFF] transition-colors rounded-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat List View - Only visible when NOT in individual chat */}
      {!showMobileChat && (
        <div className="relative z-10 container mx-auto px-4 pb-4 pt-6">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Chats</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                  />
                  <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleMobileChatSelect(chat)}
                    className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {chat.avatar ? (
                          <img 
                            src={chat.avatar} 
                            alt={chat.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-r from-[#7D3EFF] to-[#A866FF] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {chat.type === 'group' ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm5 7c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7.5 3c-1.83 0-3.5.5-3.5 2v2h7v-2c0-1.5-1.67-2-3.5-2zM2.5 14C.67 14 .67 15.5.67 15.5L.67 17h7v-2c0-1.5-1.67-2-3.5-2zM9 17v2h6v-2c0-1.5-1.34-2-3-2s-3 .5-3 2z"/>
                                </svg>
                              ) : (
                                chat.name.split(' ').map(n => n[0]).join('')
                              )}
                            </span>
                          </div>
                        )}
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        {chat.type === 'group' && (
                          <p className="text-xs text-gray-400">{chat.participants} participants</p>
                        )}
                      </div>
                      
                      {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-[#7D3EFF] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* New Chat Button */}
              <div className="p-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-[#7D3EFF] to-[#A866FF] text-white py-3 px-4 rounded-lg font-medium hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all">
                  Start New Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Chat View - Only visible when IN chat */}
      {showMobileChat && (
        <div className="relative z-10 container mx-auto px-4 pb-4 pt-6">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white/50">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleMobileBackToList}
                    className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <div className="relative">
                    {selectedChat.avatar ? (
                      <img 
                        src={selectedChat.avatar} 
                        alt={selectedChat.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-[#7D3EFF] to-[#A866FF] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {selectedChat.type === 'group' ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm5 7c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7.5 3c-1.83 0-3.5.5-3.5 2v2h7v-2c0-1.5-1.67-2-3.5-2zM2.5 14C.67 14 .67 15.5.67 15.5L.67 17h7v-2c0-1.5-1.67-2-3.5-2zM9 17v2h6v-2c0-1.5-1.34-2-3-2s-3 .5-3 2z"/>
                            </svg>
                          ) : (
                            selectedChat.name.split(' ').map(n => n[0]).join('')
                          )}
                        </span>
                      </div>
                    )}
                    {selectedChat.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{selectedChat.name}</h3>
                    <p className="text-sm text-green-600">
                      {selectedChat.online ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                  <button className="p-2 text-gray-500 hover:text-[#7D3EFF] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: '#f8f9fa' }}>
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${
                        message.senderId === 'me'
                          ? 'bg-gradient-to-r from-[#7D3EFF] to-[#A866FF] text-white'
                          : 'bg-white text-gray-900 shadow-sm'
                      }`}
                    >
                      {message.type === 'image' ? (
                        <div>
                          <img
                            src={message.message}
                            alt="Shared image"
                            className="rounded-lg cursor-pointer max-w-full h-auto"
                            onClick={() => openImagePreview(message.message)}
                          />
                          {message.caption && (
                            <p className="mt-2 text-sm">{message.caption}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm">{message.message}</p>
                      )}
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === 'me' ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-3 md:p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-[#7D3EFF] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-gradient-to-r from-[#7D3EFF] to-[#A866FF] text-white rounded-full hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImagePreview(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
} 