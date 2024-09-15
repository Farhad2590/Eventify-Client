
const TitleAndSubheading = ({ title, subheading, className = "" }) => {
  return (
    <div className={`text-center my-4 ${className}`}>
      <hr className="border-pink-400 my-4" />
      <h1 className="text-4xl font-bold text-pink-400">{title}</h1>
      <hr className="border-pink-400 my-4" />
      <p className="text-lg text-pink-400 mt-2">{subheading}</p>
    </div>
  );
};

export default TitleAndSubheading;
