export default function Navbar() {
  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .navbar-shadow {
              box-shadow: none !important;
              padding-top:1rem !important;
            }
          }
        `}
      </style>

      <div className="w-full bg-[#F5EEE1] m-0 p-0">
        <div
          className="w-full flex items-center justify-center px-6 navbar-shadow"
          style={{
            height: "clamp(60px, 10vw, 100px)",
            boxShadow: "0 4px 6px rgba(43, 43, 43, 0.08)",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(20px, 4vw, 36px)",
              color: "#171717",
              margin: 0,
            }}
          >
            HotShot
          </h1>
        </div>
      </div>
    </>
  );
}
