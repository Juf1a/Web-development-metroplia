import { useState } from "react";
import MediaRow from "../components/MediaRow.jsx";
import SingleView from "../components/SingleView.jsx";
import { useMedia } from "../hooks/apiHooks.js";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { mediaArray } = useMedia();

  return (
    <>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
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
          {mediaArray.map((mediaItem) => (
            <MediaRow
              key={mediaItem.media_id}
              item={mediaItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
