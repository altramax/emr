type headerType = {
  title: string;
  subTitle?: string;
};

export default function Header({ title, subTitle }: headerType) {
  return (
    <header className="">
      <div>
        <h1 className="text-3xl font-bold text-gray-800"> {title}</h1>
        <p className="text-base font-normal text-gray-500 mt-1">{subTitle}</p>
      </div>
    </header>
  );
}
