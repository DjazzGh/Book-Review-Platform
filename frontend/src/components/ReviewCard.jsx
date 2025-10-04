
const ReviewCard = ({ review, onEdit, onDelete, userId }) => {
  return (
    <div className="border p-4 rounded shadow mb-2">
      <p><strong>{review.userId.name}</strong>: {review.reviewText}</p>
      <p><strong>Rating:</strong> {review.rating}/5</p>
      {review.userId._id === userId && (
        <div className="space-x-2">
          <button onClick={() => onEdit(review)} className="text-blue-500 hover:underline">
            Edit
          </button>
          <button onClick={() => onDelete(review._id)} className="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
