// @mui

// components

// sections


// ----------------------------------------------------------------------

export default function Ticket(props) {
    console.log("props:", props)
    let start = new Date(props.flight.start);
    let startTime =
        `${(start.getHours() > 12) ? start.getHours() - 12 : start.getHours()}:${start.getMinutes()} ${(start.getHours() >= 12) ? "PM" : "AM"}`
    let fullName = `${(props.values[`lastName-${props.index}`]) ? props.values[`lastName-${props.index}`] : ""}` +
        ', ' +
        `${(props.values[`firstName-${props.index}`]) ? props.values[`firstName-${props.index}`] : ""} ` +
        `${props.values[`middleName-${props.index}`] ? (props.values[`middleName-${props.index}`]).slice(0, 1) : ""}`
    let seatName = props.name
    let flight = props.flight.name

    return (
        <div className="container-ticket">
            <div className="ticket">
                <div className="ticket-left">
                    <div className="corner-seat-container">
                        <div className="l-item">seat</div>
                        <div className="lgdetail">{seatName}</div>
                    </div>
                    <div className="airplane-container">
                        <img className="ticket-img" src="https://assets.codepen.io/1026437/blackAirplane.png"
                             alt="airplane-img"/>
                    </div>
                    <div className="departure-time">
                        <div className="l-item">departure time</div>
                        <div className="lgdetail">{startTime}</div>
                    </div>
                    <div className="departing">
                        <div className="l-item">departing</div>
                        <div
                            className="smdetail">{props.flight.from.city.slice(0, 11)}{props.flight.from.city.length > 11 ? "..." : ""}({props.flight.from.code})
                        </div>
                    </div>
                </div>
                <div className="ticket-middle">
                    <div className="passenger-name">
                        <div className="m-item">passenger</div>
                        <div className="smdetail mid-detail">{fullName}</div>
                    </div>
                    <div className="gate">
                        <div className="m-item">gate</div>
                        <div className="lgdetail mid-detail">***</div>
                    </div>
                    <div className="flight">
                        <div className="m-item">flight</div>
                        <div className="lgdetail mid-detail">{flight}</div>
                    </div>
                    <div className="destination">
                        <div className="m-item">destination</div>
                        <div
                            className="smdetail mid-detail">{props.flight.to.city.slice(0, 11)}{props.flight.to.city.length > 11 ? "..." : ""}({props.flight.to.code})
                        </div>
                    </div>
                    <div className="group">
                        <div className="m-item">class</div>
                        <div className="smdetail mid-detail">{props.class}</div>
                    </div>
                    <div className="serial">
                        <div>** **** *** ****</div>
                    </div>
                </div>
                <div className="ticket-right">
                    <div className="stub-flight">
                        <div className="smitem">flight</div>
                        <div className="exsmdetail">{flight}</div>
                    </div>
                    <div className="stub-seat">
                        <div className="smitem">seat</div>
                        <div className="exsmdetail">{seatName}</div>
                    </div>
                    <div className="stub-depart">
                        <div className="smitem">depart</div>
                        <div className="exsmdetail">{startTime}</div>
                    </div>
                    <div className="stub-passenger">
                        <div className="smitem">passenger</div>
                        <div className="exsmdetail">{fullName}</div>
                    </div>
                    <div className="barcode">3859384847</div>
                </div>
            </div>
        </div>
    )
}
