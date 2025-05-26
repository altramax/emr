type capitalizeFirstProps = {
  word: string;
};

const CapitalizeFirst = ({ word }: capitalizeFirstProps) => {
  const newWords = word.charAt(0).toUpperCase() + word.slice(1);
  return newWords;
};

export default CapitalizeFirst;
