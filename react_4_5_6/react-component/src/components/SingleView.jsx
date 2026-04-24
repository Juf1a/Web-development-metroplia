const SingleView = (props) => {
  const { item, setSelectedItem } = props;

  if (!item) return null;

  return (
    <dialog className="fixed top-[5%] h-[90%] bg-black/80 z-[9999] text-white/90 p-6" open={!!item}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Owner: {item.username}</p>

      {item.media_type.startsWith('image') && (
        <img className="h-[70%] object-contain max-w-full" src={item.filename} alt={item.title} />
      )}

      {item.media_type.startsWith('video') && (
        <video className="h-[70%] object-contain max-w-full" src={item.filename} controls />
      )}

      <button
        className="my-2.5 px-4 py-2 rounded bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]"
        onClick={() => setSelectedItem(null)}
      >
        Close
      </button>
    </dialog>
  );
};

export default SingleView;
