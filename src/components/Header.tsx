import Image from 'next/image';

const Header = ({}) => {
  return (
    <nav className="w-full py-4 border-b border-gray-200 navbar-light bg-light h-fit">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full">
          <Image
            src="https://manavrachna.edu.in/wp-content/uploads/2023/04/mrnaac-jpg.jpg"
            width={400}
            height={100}
            alt="Manav Rachna"
          />
          <h1 className="text-2xl font-semibold">
            School of Leadership and Management
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Header;
