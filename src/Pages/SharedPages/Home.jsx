import React, { useState } from 'react';
import EventItems from "../../Components/HomeComponents/EventItems";
import Faq from "../../Components/HomeComponents/Faq";
import Testimonial from "../../Components/HomeComponents/Testimonial";
import Banner from "../../Components/HomeComponents/Banner";
import CallToAction from "../../Components/HomeComponents/CallToAction";
import OurEvents from "../../Components/HomeComponents/OurEvents";
import { Button, Modal, TextField, List, ListItem, ListItemText } from '@mui/material';
import { ChatBubble as ChatBubbleIcon } from '@mui/icons-material';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setUserMessages([...userMessages, newMessage]);
      const aiResponse = "Hello! I'm the AI assistant. I can help you with any questions you have.";
      setAiMessages([...aiMessages, aiResponse]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <Banner />
      <OurEvents />
      <EventItems />
      <CallToAction />
      <Testimonial />
      <Faq />

      <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#3a86ff',
            color: 'white',
            borderRadius: '50%',
            padding: 12,
            '&:hover': {
              backgroundColor: '#2e6edd',
            },
          }}
          onClick={toggleModal}
        >
          <ChatBubbleIcon />
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 24, borderRadius: 8, width: 400, height: 600, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            <List>
              {[...userMessages, ...aiMessages].map((message, index) => (
                <ListItem key={index} style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                  <ListItemText
                    primary={message}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#3a86ff' : '#f0f0f0',
                      color: index % 2 === 0 ? 'white' : 'black',
                      padding: 8,
                      borderRadius: 16,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
            <TextField
              id="new-message"
              label="Type your message"
              variant="outlined"
              value={newMessage}
              onChange={handleNewMessage}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: '#3a86ff',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#2e6edd',
                },
              }}
              onClick={sendMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;