import React from "react";
interface FooterProps {
    text?: String;
}
const Footer: React.FC<FooterProps> = ({ text = "@ 2025 Luong Thi Diem"}) => {
    return (
        <footer
        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-4 text-center mt-auto"
        >
        </footer>

    );
};
export default Footer;
