import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Search, MoreVertical } from 'lucide-react';
import { mockMessages } from '@/data/mockData';

export default function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState(mockMessages[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = mockMessages.filter(msg =>
    msg.cleanerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    // Mock sending message
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="h-[calc(100vh-12rem)] border-border shadow-xl overflow-hidden flex">
          {/* Sidebar - Conversations List */}
          <div className="w-full sm:w-80 border-r border-border flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              <div className="divide-y divide-border">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedChat(message)}
                    className={`w-full p-4 text-left hover:bg-muted/30 transition-colors ${
                      selectedChat?.id === message.id ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage src={message.cleanerAvatar} alt={message.cleanerName} />
                        <AvatarFallback>{message.cleanerName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground text-sm truncate">
                            {message.cleanerName}
                          </h3>
                          {message.unread > 0 && (
                            <Badge className="bg-primary text-white text-xs">
                              {message.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-1">
                          {message.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedChat.cleanerAvatar} alt={selectedChat.cleanerName} />
                    <AvatarFallback>{selectedChat.cleanerName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-heading font-semibold text-foreground">
                      {selectedChat.cleanerName}
                    </h2>
                    <p className="text-xs text-muted-foreground">Active now</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedChat.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === 'customer' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          msg.sender === 'customer'
                            ? 'bg-primary text-white rounded-tr-sm'
                            : 'bg-muted text-foreground rounded-tl-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'customer' ? 'text-white/70' : 'text-muted-foreground'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1 h-11"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-11 w-11 bg-primary hover:bg-primary-hover text-white"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  );
}