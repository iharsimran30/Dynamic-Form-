import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount, shallow } from 'enzyme'
import Room from './Components/Room'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import RoomData from './Room.json'

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('it should render 4 Rooms', () => {
  const wrapper = mount(<App />);
  const roomComponents = wrapper.find("Room");
  expect(roomComponents.length).toEqual(4);
});


it('should render correctly', () => {
  const output = renderer
    .create(<App />)
    .toJSON();
  expect(output).toMatchSnapshot();
});

it('it should render submit Button', () => {
  const wrapper = mount(<App />);
  const wrapperInstance = shallow(<App />);
  expect(wrapperInstance).toEqual({});

  const btnSubmit = wrapper.find("#btnSubmit");
  expect(btnSubmit.length).toEqual(1);
});



it('it should render Rooms component', () => {
  const wrapper = mount(<App />);
  const onHandleChange = jest.fn();
  const onHandleDropDown = jest.fn();

  const roomComponents = wrapper.find(Room);

  const instancesRoom = RoomData.map((room, idx) => shallow(<Room {...room} key={room.RoomNo}
    onHandleChange={onHandleChange}
    onHandleDropDown={onHandleDropDown}
  />));

  roomComponents.forEach((room, i) => {
    const chkBox = room.find('.room-check-box');
    const props = room.props();
    if (i === 0) {
      expect(chkBox.length).toEqual(0)
    } else {
      chkBox.simulate('change');
      expect(onHandleChange).toHaveBeenCalledWith(props.RoomNo)
    }
  })
  expect(roomComponents.length).toEqual(instancesRoom.length);
});


