import "./create.css";
import axios from "axios";
import { useState } from "react";

const Create = ({ setCreate, location, username, setPins }: any) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState<any>(null);
  const [desc, setDesc] = useState("");

  const addPin = async (e: any) => {
    e.preventDefault();
    if (
      username &&
      title &&
      desc &&
      location &&
      rating &&
      rating < 6 &&
      rating > -1
    ) {
      try {
        await axios.post(process.env.REACT_APP_SERVER_URL + "/pins/", {
          username,
          title,
          rating,
          desc,
          lat: location.lat,
          long: location.lng,
        });
        setPins((prev: any) => [
          ...prev,
          {
            username,
            title,
            rating,
            desc,
            lat: location.lat,
            long: location.lng,
          },
        ]);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Something went Wrong!");
    }
    closePopup();
  };

  const closePopup = () => {
    setCreate(false);
  };

  return (
    <div className="overlay">
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            value={rating}
            min={0}
            max={5}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="btns">
          <button onClick={closePopup}>Close</button>
          <button onClick={addPin}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
