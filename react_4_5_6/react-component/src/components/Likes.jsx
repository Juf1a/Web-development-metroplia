import { useState, useEffect } from 'react';
import { useLike } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/contextHooks';

const Likes = ({ media_id }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null);
  const { getLikeCountByMediaId, getLikesByMedia, postLike, deleteLike } = useLike();
  const { user } = useUserContext();

  const fetchLikes = async () => {
    try {
      const countResult = await getLikeCountByMediaId(media_id);
      setLikeCount(countResult.count);

      if (user) {
        const allLikes = await getLikesByMedia(media_id);
        const found = allLikes.find((like) => like.user_id === user.user_id) ?? null;
        setUserLike(found);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [media_id]);

  const handleLike = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      if (userLike) {
        await deleteLike(userLike.like_id, token);
      } else {
        await postLike(media_id, token);
      }
      await fetchLikes();
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  return (
    <div className="mt-4">
      <button
        className="px-4 py-2 rounded bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111] disabled:opacity-50 disabled:cursor-default"
        onClick={handleLike}
        disabled={!user}
      >
        {userLike ? '♥' : '♡'} {likeCount}
      </button>
    </div>
  );
};

export default Likes;
