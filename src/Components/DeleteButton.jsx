import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";
import { deleteComment, deleteArticle } from "../Utils/api";
import { useContext } from "react";
import { useNavigate } from "react-router";

export const DeleteButton = ({
  comment,
  article,
  setComments,
  setCommentCount,
  setArticles,
}) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDeleteComment = async () => {
    setCommentCount((curr) => Number(curr) - 1);
    try {
      deleteComment(comment.comment_id);
      setComments((curr) =>
        curr.filter((curr_comm) => curr_comm.comment_id !== comment.comment_id)
      );
    } catch {
      console.log("BAD");
      setCommentCount((curr) => curr + 1);
    }
  };

  const handleDeleteArticle = () => {
    if (setArticles)
      setArticles((curr) =>
        curr.filter((curr_art) => curr_art.article_id !== article.article_id)
      );
    try {
      deleteArticle(article.article_id);
      if (!setArticles) navigate(`/users/${user.username}`);
    } catch {
      console.log("BAD");
    }
  };

  return (
    <>
      {!(article && article.author === user.username) &&
      !(comment && comment.author === user.username) ? null : (
        <>
          {comment ? (
            <>
              <Button size="sm" variant="danger" onClick={handleDeleteComment}>
                Delete comment
                <FaTrash />
              </Button>
              <br></br>
            </>
          ) : (
            <>
              <Button size="sm" variant="danger" onClick={handleDeleteArticle}>
                Delete article
                <FaTrash />
              </Button>
              <br></br>
            </>
          )}
        </>
      )}
    </>
  );
};
