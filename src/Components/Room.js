import React from 'react';
import styled from 'styled-components';

const RoomForm = styled.form`
    background-color:#D3D3D3 !important;
`;

const RoomBody = styled.div`
    ${({bodyClass}) => {
      return  bodyClass && `
         background-color:#fff !important;
    `
    }}
`;

const Room = (props) => {

  return (
    <RoomForm className=" card p-2 m-3" disabled>
      <div className="room-header text-left mb-3 font-weight-bold">
        {!props.hideCheckbox && (
          <input type="checkbox"
            id={`room-chk-${props.index}`}
            className="mx-2 room-check-box"
            checked={props.checked}
            onChange={props.onHandleChange(props.RoomNo)}
            value={props.RoomNo}
          />)}
        <label htmlFor={`room-chk-${props.index}`}>{props.title}</label>
      </div>
      <fieldset disabled={props.disabled}>

        <RoomBody className="p-3" bodyClass={props.bodyClass}>
          <div className="d-flex justify-content-between">
            <label className="mx-3" htmlFor="adults">Adults <br />(18+)</label>
            <label className="mx-3" htmlFor="children">Children<br /> (0-17)</label>
          </div>
          <div className="d-flex justify-content-between">
            <select
              id="adults"
              className="mx-3"
              value={props.Adults.find(a => a == props.adult)}
              onChange={props.onHandleDropDown('adult', props.RoomNo)}>
              {props.Adults.map(a => {
                return (<option key={a} value={a}>{a}</option>)
              })}
            </select>

            <select
              id="children"
              className="mx-3"
              value={props.Children.find(a => a == props.child)}
              onChange={props.onHandleDropDown('child', props.RoomNo)}>
              {props.Children.map(c => {
                return (<option key={c} value={c}>{c}</option>)
              })}
            </select>

          </div>
        </RoomBody>
      </fieldset>
    </RoomForm>
  )
}

export default Room;
