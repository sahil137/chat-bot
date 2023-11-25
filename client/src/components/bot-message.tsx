interface Props {
  text: string;
}
function BotMessage({ text }: Props) {
  return (
    <div className="w-4/5 border border-black rounded-md p-3 bg-slate-400 my-2">
      {text}
    </div>
  );
}

export default BotMessage;
