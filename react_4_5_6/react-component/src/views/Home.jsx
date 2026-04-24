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
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 border border-[#ccc] text-center">Thumbnail</th>
            <th className="p-4 border border-[#ccc] text-center">Title</th>
            <th className="p-4 border border-[#ccc] text-center">Description</th>
            <th className="p-4 border border-[#ccc] text-center">Created</th>
            <th className="p-4 border border-[#ccc] text-center">Size</th>
            <th className="p-4 border border-[#ccc] text-center">Type</th>
            <th className="p-4 border border-[#ccc] text-center">Owner</th>
            <th className="p-4 border border-[#ccc] text-center"></th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((mediaItem) => (
            <MediaRow
              key={mediaItem.media_id}
              item={mediaItem}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
