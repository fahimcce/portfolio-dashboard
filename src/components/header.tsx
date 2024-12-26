"use client";
import Cookies from "js-cookie";

export default function Header() {
  const logOut = () => {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "/";
  };
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
      <div className="text-lg font-semibold text-gray-800">Dashboard</div>
      <div>
        <button
          onClick={() => logOut()}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
