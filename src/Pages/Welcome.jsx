import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <>
    <header title="Welcome" ></header>
    <div
      className="relative w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/1.png')",
      }}
    >
      {/* Top right buttons */}
      <div className="absolute top-6 right-8 flex space-x-3 z-10">
        <Link
          to="/login"
          className="border border-black text-black px-5 py-2 rounded-md text-sm font-semibold transition"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "rgba(243, 244, 246, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          LOG IN
        </Link>

        <Link
          to="/register"
          className="bg-[#563d28] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#3d1c00ff] transition"
        >
          SIGN UP
        </Link>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center text-center mt-10 z-0">
        <img
          style={{ marginTop: "-3rem" }}
          src="/images/2.png"
          alt="88 Chocolates & More Logo"
          className="mx-auto w-80 mb-6"
        />
        <p
          className="text-2xl font-extrabold text-[#3d1c00ff] tracking-wide leading-snug px-4 text-center"
          style={{
            WebkitTextStroke: ".5px white",
            WebkitTextFillColor: "#3d1c00ff",
            textShadow: "1px 2px rgba(0,0,0,0.5)",
          }}
        >
          "Bringing you quality chocolates at an <br />
          affordable price, always near your place."
        </p>
      </div>
    </div>
    </>
  );
}





