const PostCardItem = ({ category, title, content }: Props) => {
  return (
    <div>
      <p className="text-blue-600 font-extrabold text-base mb-4">{category}</p>
      <h3 className="text-gray-900 font-extrabold text-lg">{title}</h3>
      <p className="text-gray-600 font-medium text-sm">{content}</p>
    </div>
  );
};

export default PostCardItem;

interface Props {
  category: string;
  title: string;
  content: string;
}
