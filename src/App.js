import React from 'react';
import Room from './Components/Room'
import RoomData from './Room.json'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const roomDataFinal = localStorage.getItem('room') ? JSON.parse(localStorage.getItem('room')) : RoomData;
  const [roomData, setRoomData] = React.useState([...roomDataFinal])

  const onSubmit = () => {
    localStorage.setItem("room", JSON.stringify(roomData));
    alert("Room Saved Successfully!!!");
  }

  const onHandleDropDown = (name, rNo) => event => {
    const roomIndex = roomData.findIndex(r => r.RoomNo === rNo);
    roomData[roomIndex] = { ...roomData[roomIndex], [name]: event.target.value };
    setRoomData([...roomData]);
  };

  const getRoom = ({ checked, r }) => {
    return {
      ...r,
      checked: checked,
      bodyClass: checked ? "room-body" : "",
      disabled: !checked,
      adult: !checked ? "0" : r.adult,
      child: !checked ? "0" : r.child
    }
  }

  const onHandleChange = rNo => event => {
    const rooms = roomData.map((r, idx, rooms) => {
      if (r.RoomNo >= rNo && !r.hideCheckbox && !event.target.checked) {
        rooms[idx] = getRoom({ checked: event.target.checked, r });
      }
      if (r.RoomNo <= rNo && !r.hideCheckbox && event.target.checked) {
        rooms[idx] = getRoom({ checked: event.target.checked, r });
      }
      return rooms[idx];
    });
    setRoomData([...rooms]);
  }

  return (
    <div className="App">
      <div className="d-flex" autoComplete="off">
        {roomData.map((room, idx) => {
          return <Room {...room} key={room.RoomNo}
            onHandleChange={onHandleChange}
            onHandleDropDown={onHandleDropDown} />
        })}

      </div>
      <div className="float-left mx-5">
        <input id="btnSubmit" type="button" value="Submit" onClick={() => onSubmit()} />
      </div>

    </div>
  );
}

export default App;
