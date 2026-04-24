import { useLocation, useNavigate } from "react-router";
import Likes from "../components/Likes";

const Single = () => {
  const { state } = useLocation();
  const item = state?.item;
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Owner: {item.username}</p>

      {item.media_type.startsWith('image') && (
        <img className="max-w-full" src={item.filename} alt={item.title} />
      )}

      {item.media_type.startsWith('video') && (
        <video className="max-w-full" src={item.filename} controls />
      )}

      <Likes media_id={item.media_id} />

      <button
        className="my-2.5 px-4 py-2 rounded bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]"
        onClick={() => navigate(-1)}
      >
        Close
      </button>
    </div>
  );
};

export default Single;
