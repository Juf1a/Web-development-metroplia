import { useState, useEffect } from "react";
import MediaRow from "../components/MediaRow.jsx";
import SingleView from "../components/SingleView.jsx";
import fetchData from "../utils/fetchData.js";

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const getMedia = async () => {
    try {
      const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
      const newArray = await Promise.all(json.map(async (item) => {
        const result = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
        return { ...item, username: result.username };
      }));

      setMediaArray(newArray);
      console.log(newArray);

    } catch (error) {
      console.error('Virhe tapahtui:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
    </>
  );
};
export default Home;