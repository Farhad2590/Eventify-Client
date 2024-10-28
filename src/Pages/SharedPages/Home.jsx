import React, { useState } from 'react';
import EventItems from "../../Components/HomeComponents/EventItems";
import Faq from "../../Components/HomeComponents/Faq";
import Testimonial from "../../Components/HomeComponents/Testimonial";
import Banner from "../../Components/HomeComponents/Banner";
import CallToAction from "../../Components/HomeComponents/CallToAction";
import OurEvents from "../../Components/HomeComponents/OurEvents";
import { Button, Modal, Typography } from '@mui/material';
import { ChatBubble as ChatBubbleIcon } from '@mui/icons-material';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 24, borderRadius: 8, width: 400 }}>
          <Typography id="modal-title" variant="h6" component="h2" style={{ color: '#3a86ff' }}>
            Ask the AI Assistant
          </Typography>
          <Typography id="modal-description" style={{ marginTop: 16 }}>
            How can I assist you today? Feel free to ask me anything and I'll do my best to help.
          </Typography>
          {/* Add the actual AI assistant functionality here */}
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={toggleModal}
              style={{
                color: '#3a86ff',
                '&:hover': {
                  backgroundColor: 'rgba(58, 134, 255, 0.1)',
                },
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;