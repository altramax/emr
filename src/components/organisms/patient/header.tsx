type headerType = {
  title: string;
  subTitle?: string;
};

export default function Header({ title, subTitle }: headerType) {
  return (
    <header className="">
      <div>
        <h1 className="text-xl font-bold text-blue-700"> {title}</h1>
        <p className="text-sm font-normal text-blue-700">{subTitle}</p>
      </div>
    </header>
  );
}
