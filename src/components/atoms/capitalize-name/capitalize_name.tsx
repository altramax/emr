const capitalizeName = (name: string | undefined) => {
  if (!name) return '';
  if (name.includes('_')) {
    const newName = name
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return newName;
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export default capitalizeName;
