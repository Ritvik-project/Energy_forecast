// Compare.jsx
import React, { useState, useEffect } from "react";
import LocationPicker from "../components/LocationPicker";
import SolarGraph from "../components/Solargraph";
import WindGraph from "../components/Windgraph";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Compare() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchAddress = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    setLocation(data.display_name || "");
  };

  const fetchLatLng = async (location) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
    );
    const data = await res.json();
    if (data[0]) {
      const newLat = parseFloat(data[0].lat);
      const newLng = parseFloat(data[0].lon);
      setLat(newLat);
      setLng(newLng);
      setPosition({ lat: newLat, lng: newLng });
    }
  };
  useEffect(() => {
    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      if (!isNaN(latNum) && !isNaN(lngNum)) {
        setPosition({ lat: latNum, lng: lngNum });
        fetchAddress(latNum, lngNum);
      }
    }
  }, [lat, lng]);

  useEffect(() => {
    if (position) {
      setLat(position.lat.toFixed(5));
      setLng(position.lng.toFixed(5));
      fetchAddress(position.lat, position.lng);
    }
  }, [position]);

  const [containers, setContainers] = useState([
    { id: 1, latitude: "", longitude: "", name: "" },
    { id: 2, latitude: "", longitude: "", name: "" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeContainer, setActiveContainer] = useState(null);

  const addContainer = () => {
    const newId = containers.length
      ? containers[containers.length - 1].id + 1
      : 1;
    setContainers([
      ...containers,
      { id: newId, latitude: "", longitude: "", name: "" },
    ]);
  };

  const handleOpen = (containerId) => {
    setActiveContainer(containerId);
    setIsOpen(true);
  };

  // const handleClose = () => {
  //   setIsOpen(false);
  //   setActiveContainer(null);
  // };

  const handleSaveLocation = (lat, lng, name) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === activeContainer
          ? { ...c, latitude: lat, longitude: lng, name }
          : c
      )
    );
    handleClose();
  };

  return (
    <div className="compare">
      <div className="container-wrapper">
        {containers.map((item, index) => (
          <div key={index} className="box pop-in">
            <div
              style={{
                width: "auto",
                alignSelf: "center",
              }}
            >
              Location {item.id}
            </div>
            <div>Name: {item.name || "-"}</div>
            <div>Latitude: {item.latitude || "-"}</div>
            <div>Longitude: {item.longitude || "-"}</div>
            <div style={{justifyContent:'center', alignSelf:'center'}}>
              <Button variant="primary" onClick={handleShow}>
              Set Location
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Set Location</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <input
                    type="text"
                    value={location}
                    placeholder='Location:    Ex- Delhi'
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        fetchLatLng(location);
                      }
                    }}   
                    style={{border:'1px solid black'}}
                  />
                </div>
                <div >
                  <label for='latitude' >Latitude:</label>
                  <input type="text" id='latitude' value={lat} onChange={(e) => setLat(e.target.value)} style={{ backgroundColor: 'white', left:'0'  }} />
                  <label for='longitude' >Longitude:</label>
                  <input type="text" id='longitude' value={lng} onChange={(e) => setLng(e.target.value)} style={{ backgroundColor: 'white', right:'0' }} />

                </div>
                <div>
                  
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
            
          </div>
        ))}

        <button onClick={addContainer} className="add-button pop-in">
          ➕ Add Container
        </button>
      </div>

      {/* {isOpen && (
        <div className="overlay">
          <div className="modal">
            <h3>Set Location for Container {activeContainer}</h3>
            {/* <LocationPicker
              initialLocation={containers.find(c => c.id === activeContainer)}
              onSave={handleSaveLocation}
              onCancel={handleClose}
            /> 
           </div>
        </div>
      )} */}

      {/* <div className="graphs">
        {containers.map(container => (
          <div key={container.id} className="graph-section">
            <h4>{container.name || `Location ${container.id}`}</h4>
            <SolarGraph lat={container.latitude} lng={container.longitude} />
            <WindGraph lat={container.latitude} lng={container.longitude} />
          </div>
        ))}
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <SolarGraph />
      </div>
    </div>
  );
}

export default Compare;
