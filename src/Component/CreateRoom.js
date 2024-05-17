import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, RadioGroup, Radio, Box } from '@mui/material';
import retro from '../Service/RetrospectService'; 
import img1 from '../Asserts/img1.jpeg';
import img2 from '../Asserts/img2.jpeg';
import img3 from '../Asserts/img3.jpeg';
import img4 from '../Asserts/img4.jpeg';

const Createroom = ({ open, onClose, roomToUpdate }) => {
  const [roomDetails, setRoomDetails] = useState({
    roomDescription: '',
    roomName: '',
    room_image: '',
    room_startdate: '',
    room_enddate: ''
  });

  useEffect(() => {
    if (roomToUpdate) {
      setRoomDetails(roomToUpdate); 
    } else {
      setRoomDetails({
        roomDescription: '',
        roomName: '',
        room_image: '',
        room_startdate: '',
        room_enddate: ''
      });
    }
  }, [roomToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails({ ...roomDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (roomToUpdate) {
        await retro.updateRoom(roomToUpdate.roomId, roomDetails);
      } else {
        await retro.createRoom(roomDetails);
      }
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error creating/updating room:', error);
    }
  };

  const handleImageChange = (image) => {
    setRoomDetails({ ...roomDetails, room_image: image });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{roomToUpdate ? 'Update Room' : 'Create Room'}</DialogTitle>
      <DialogContent>
        <TextField
          name="roomName"
          label="Room-Name"
          value={roomDetails.roomName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          name="roomDescription"
          label="Room-Description"
          value={roomDetails.roomDescription}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '10px' }}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <TextField
            label="Start Date"
            type="date"
            name="room_startdate"
            value={roomDetails.room_startdate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '45%', marginBottom:'3%' }}
          />
          <TextField
            label="End Date"
            type="date"
            name="room_enddate"
            value={roomDetails.room_enddate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '45%' }}
          />
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="select image"
            name="room_image"
            value={roomDetails.room_image}
            onChange={(e) => handleImageChange(e.target.value)}
          >
            <Box display="flex" alignItems="center">
              <Radio value={img1} />
              <img src={img1} alt="Img 1" style={{ width: 37, height: 37, borderRadius: '50%', marginRight: '10px' }} />
            </Box>
            <Box display="flex" alignItems="center">
              <Radio value={img2} />
              <img src={img2} alt="Img 2" style={{ width: 37, height: 37, borderRadius: '50%', marginRight: '10px' }} />
            </Box>
            <Box display="flex" alignItems="center">
              <Radio value={img3} />
              <img src={img3} alt="Img 3" style={{ width: 37, height: 37, borderRadius: '50%', marginRight: '10px' }} />
            </Box>
            <Box display="flex" alignItems="center">
              <Radio value={img4} />
              <img src={img4} alt="Img 4" style={{ width: 37, height: 37, borderRadius: '50%', marginRight: '10px' }} />
            </Box>
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {roomToUpdate ? 'Update' : 'Create'}
        </Button>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Createroom;

