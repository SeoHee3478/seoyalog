import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between px-[75px] py-[30px]">
      <div>
        <Link href="/">SeoyaLog</Link>
      </div>
      <div>
        <Link className="px-6" href="/posts">
          Posts
        </Link>
        <Link className="px-6" href="/about">
          About
        </Link>
        <Link className="px-6" href="/visitor">
          Visitor
        </Link>
      </div>
    </div>
  );
};

export default Header;
