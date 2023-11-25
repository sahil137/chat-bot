interface Props {
  text: string;
}

const UserMessage = ({ text }: Props) => {
  return (
    <div className="w-4/5 border border-black bg-zinc-700 rounded-lg p-3 my-2">
      {text}
    </div>
  );
};

export default UserMessage;
