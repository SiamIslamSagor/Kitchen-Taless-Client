// eslint-disable-next-line react/prop-types
const SectionTitle = ({ title = "Heading" }) => {
  return (
    <div className="flex flex-col item-center justify-center  my-10">
      <h1 className="leading-none text-center text-2xl sm:text-3xl md:text-4xl sm:font-semibold font-medium ">
        <span className="text-dark-green"> ----</span> {title}
        <span className="text-dark-green"> ----</span>
      </h1>
    </div>
  );
};

export default SectionTitle;
