interface Props {
  onClick: () => void;
}

const LoadMoreItemsBtn = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white border-none rounded-full h-12 w-60.75 hover:cursor-pointer"
    >
      <p>Load More Items</p>
    </button>
  );
};

export default LoadMoreItemsBtn;
