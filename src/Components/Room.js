import React from 'react';


const Room = (props) => {

  return (
    <form className="room card p-2 m-3" disabled>
      <div className="room-header text-left mb-3 font-weight-bold">
        {!props.hideCheckbox && (
          <input type="checkbox"
            className="mx-2"
            checked={props.checked}
            onChange={props.onHandleChange(props.RoomNo)}
            value={props.RoomNo}
          />)}

        {props.title}
      </div>
      <fieldset disabled={props.disabled}>

        <div className={`p-3 ${props.bodyClass}`}>
          <div className="d-flex justify-content-between">
            <label className="mx-3" htmlFor="age-simple">Adults <br />(18+)</label>
            <label className="mx-3" htmlFor="age-simple">Children<br /> (0-17)</label>
          </div>
          <div className="d-flex justify-content-between">
            <select
              className="mx-3"
              value={props.Adults.find(a=> a==props.adult)}
              onChange={props.onHandleDropDown('adult',props.RoomNo)}>
              {props.Adults.map(a => {
                return (<option key={a} value={a}>{a}</option>)
              })}
            </select>

            <select
              className="mx-3"
              value={props.Children.find(a=> a==props.child)}
              onChange={props.onHandleDropDown('child',props.RoomNo)}>
              {props.Children.map(c => {
                return (<option key={c} value={c}>{c}</option>)
              })}
            </select>

          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default Room;
