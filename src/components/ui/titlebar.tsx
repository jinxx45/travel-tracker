type TitlebarProps = {
  title: string;
  logourl: string;
};

const Titlebar: React.FC<TitlebarProps> = ({ title, logourl }) => {
  return (
    <div className="flex items-center">
      <img className="w-7 h-7" src={logourl} alt="" />
      <h4 className="ml-2 font-semibold text-white">{title}</h4>
    </div>
  );
};

export default Titlebar;
