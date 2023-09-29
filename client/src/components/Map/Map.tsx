import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import axios from "axios";
import Create from "../Create/Create";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/apiCalls";

export default function Map() {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [pins, setPins] = useState<any>([]);
  const [create, setCreate] = useState(false);
  const [zoom] = useState(8);
  maptilersdk.config.apiKey = "6SzM7tCD0XlUc5D9DmQh";
  const [mainLocation, setMainLocation] = useState<any>(null);
  const [clickedLocation, setClickedLocation] = useState<any>(null);

  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    userLogout(dispatch);
    navigate("/login");
  };

  useEffect(() => {
    navigator.geolocation.watchPosition((e) => {
      setMainLocation({ lng: e.coords.longitude, lat: e.coords.latitude });
    });

    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (mainLocation && !map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current as any,
        style: maptilersdk.MapStyle.STREETS,
        center: [mainLocation.lng, mainLocation.lat] as any,
        zoom: zoom,
      });
      map.current.on("dblclick", (e: any) => {
        setCreate(true);
        setClickedLocation(e.lngLat);
      });
    }
  }, [zoom, mainLocation]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/pins/");
        setPins(res.data);
        console.log(res.data);
      } catch (err) {}
    };
    fetchPins();
  }, []);

  useEffect(() => {
    if (map.current && mainLocation) {
      pins.map((pin: any) => {
        const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(
          `<div><h3>${pin.title}</h3><p>${pin.desc}</p><p>rating: (<b>${
            pin.rating
          }</b>)</p><p>Created by <strong>${pin.username}</strong></p>${
            pin.username === currentUser.username
              ? "<button id='deleteBtn'>Delete</button>"
              : ""
          }</div>`
        );

        popup.on("open", () => {
          const deleteButton = document.getElementById("deleteBtn");

          if (deleteButton) {
            deleteButton.addEventListener("click", async () => {
              if (pin._id) {
                await axios
                  .delete("http://localhost:8080/api/pins/" + pin._id)
                  .then(() => {
                    window.location.reload();
                  });
              } else {
                alert("Reload Page to Do it!");
              }
            });
          }
        });

        new maptilersdk.Marker({
          color: `${
            pin.username === currentUser.username ? "#ff0000" : "#0000ff"
          }`,
        })
          .setLngLat([pin.long, pin.lat])
          .setPopup(popup)
          .addTo(map.current);
      });
    }
  }, [pins, mainLocation]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" id="map" />
      {create && (
        <Create
          setCreate={setCreate}
          username={currentUser.username}
          location={clickedLocation}
          setPins={setPins}
        />
      )}
      <div className="instructions">
        <span>Double Click to Create a Pin</span>
        <hr />
        <span>Click on Pin to Show its Details</span>
      </div>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
