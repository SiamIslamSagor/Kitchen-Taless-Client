// eslint-disable-next-line react/prop-types
const SectionTitle = ({ title = "Heading" }) => {
  return (
    <div className="flex flex-col item-center justify-center  py-10 sm:py-16 md:py-20   mx-5 ">
      <h1 className="leading-none w-fit mx-auto text-center text-xl text2xl sm:text-3xl md:text-4xl sm:font-semibold font-medium text-dark-green">
        <span className="text-dark-green"> ----</span> {title}
        <span className="text-dark-green"> ----</span>
      </h1>
    </div>
  );
};

export default SectionTitle;
