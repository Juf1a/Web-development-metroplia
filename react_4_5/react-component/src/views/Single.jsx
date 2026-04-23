import {useLocation} from "react-router";
import { useNavigate } from "react-router";

const Single = () => {
  const {state} = useLocation();
  const item = state?.item;
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>

      {item.media_type.startsWith('image') && (
        <img src={item.filename} />
      )}

      {item.media_type.startsWith('video') && (
        <video src={item.filename} controls />
      )}

      <button onClick={() => navigate(-1)}>Close</button>
      
    </div>
  );
};

export default Single