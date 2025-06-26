type headerType = {
  title: string;
  subTitle?: string;
};

export default function Header({ title, subTitle }: headerType) {
  return (
    <header className="">
      <div>
        <h1 className="text-xl font-bold text-gray-800"> {title}</h1>
        <p className="text-sm font-normal text-gray-500 mt-1">{subTitle}</p>
      </div>
    </header>
  );
}
