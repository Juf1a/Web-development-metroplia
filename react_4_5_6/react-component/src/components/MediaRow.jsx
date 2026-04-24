import { Link } from "react-router";

const MediaRow = (props) => {
  const { item, selectedItem, setSelectedItem } = props;

  return (
    <tr
      className={selectedItem?.media_id === item.media_id ? "selected-row" : ""}
      onClick={() => setSelectedItem(item)}
    >
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.created_at}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>{item.username}</td>
      <td><Link to="/single" state={{item}}>Show</Link></td>
    </tr>
  );
};

export default MediaRow;