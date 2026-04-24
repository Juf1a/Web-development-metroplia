import { Link, useNavigate } from "react-router";
import { useUserContext } from "../hooks/contextHooks";
import { useMedia } from "../hooks/apiHooks";

const MediaRow = (props) => {
  const { item, selectedItem, setSelectedItem } = props;
  const { user } = useUserContext();
  const { deleteMedia } = useMedia();
  const navigate = useNavigate();

  const canModify = user && (user.user_id === item.user_id || user.role === 'admin');

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteMedia(item.media_id, token);
      navigate(0);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <tr
      className={`cursor-pointer ${selectedItem?.media_id === item.media_id ? "bg-[#3a3a3a]" : ""}`}
      onClick={() => setSelectedItem(item)}
    >
      <td className="p-4 border border-[#ccc] text-center">
        <img className="w-[260px] h-[200px] object-cover" src={item.thumbnail} alt={item.title} />
      </td>
      <td className="p-4 border border-[#ccc] text-center">{item.title}</td>
      <td className="p-4 border border-[#ccc] text-center">{item.description}</td>
      <td className="p-4 border border-[#ccc] text-center">{item.created_at}</td>
      <td className="p-4 border border-[#ccc] text-center">{item.filesize}</td>
      <td className="p-4 border border-[#ccc] text-center">{item.media_type}</td>
      <td className="p-4 border border-[#ccc] text-center">{item.username}</td>
      <td className="p-4 border border-[#ccc] text-center">
        <div className="flex flex-col gap-1 items-center">
          <Link
            className="text-white no-underline bg-[#363636] px-2 py-1 hover:bg-[#111111]"
            to="/single"
            state={{ item }}
          >
            Show
          </Link>
          {canModify && (
            <>
              <button
                className="my-0 px-2 py-1 rounded bg-[#4a6a4a] text-white border-none cursor-pointer hover:bg-[#2a4a2a]"
                onClick={(e) => { e.stopPropagation(); console.log('modify', item); }}
              >
                Modify
              </button>
              <button
                className="my-0 px-2 py-1 rounded bg-[#6a3a3a] text-white border-none cursor-pointer hover:bg-[#4a1a1a]"
                onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MediaRow;
