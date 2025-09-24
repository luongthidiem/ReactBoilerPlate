import React from "react";
interface FooterProps {
  text?: string;
}
const Footer: React.FC<FooterProps> = ({ text = "@ 2025 Luong Thi Diem" }) => {
  return (
    <footer className="bg-[#70C2B4] text-gray-800 p-4 text-center mt-auto shadow-md">
      {text}
    </footer>
  );
};
export default Footer;
