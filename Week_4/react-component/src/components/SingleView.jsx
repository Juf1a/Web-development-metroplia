const SingleView = (props) => {
  const { item, setSelectedItem} = props;

  if (!item) return null;

  return (
    <dialog open={!!item}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>

      {item.media_type.startsWith('image') && (
        <img src={item.filename} />
      )}

      {item.media_type.startsWith('video') && (
        <video src={item.filename} controls />
      )}

      <button onClick={() => setSelectedItem(null)}>Close</button>
      
    </dialog>
  );
};

export default SingleView;