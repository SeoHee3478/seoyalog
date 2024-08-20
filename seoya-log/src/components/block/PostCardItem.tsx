const PostCardItem = ({ category, title, content }: Props) => {
  return (
    <div>
      <p>{category}</p>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default PostCardItem;

interface Props {
  category: string;
  title: string;
  content: string;
}
