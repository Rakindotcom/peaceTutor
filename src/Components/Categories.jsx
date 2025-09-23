import React from "react";
import Slider from "react-slick";
import { FaGraduationCap, FaLaptopCode, FaPencilAlt, FaBriefcase, FaPaintBrush, FaBook, FaLanguage } from "react-icons/fa";


const Categories = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                },
            },
        ],
    };

    const categories = [
        { name: "S.S.C.", icon: <FaGraduationCap /> },
        { name: "H.S.C.", icon: <FaGraduationCap /> },
        { name: "O & A Level", icon: <FaGraduationCap /> },
        { name: "Admission", icon: <FaBook /> },
        { name: "IELTS", icon: <FaLanguage /> },           // updated
        { name: "Spoken English", icon: <FaLanguage /> },  // updated
        { name: "Job", icon: <FaLaptopCode /> },
        { name: "BCS", icon: <FaBriefcase /> },
        { name: "Drawing", icon: <FaPaintBrush /> },
        { name: "Handwriting", icon: <FaPencilAlt /> },
        { name: "Arabic", icon: <FaGraduationCap /> },
        { name: "Recitation", icon: <FaGraduationCap /> },
    ];


    return (
        <section className="w-full py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
                        Serving Categories
                    </h1>
                    <p className="mt-4 text-sm sm:text-base font-medium text-blue-800 max-w-2xl mx-auto">
                        Explore a wide range of categories to hire tutors for your needs.
                    </p>
                </div>

                <Slider {...settings}>
                    {categories.map((category, index) => (
                        <div key={index} className="flex justify-center px-2 sm:px-4">
                            <div className="bg-gradient-to-br from-blue-100 to-white p-4 sm:p-6 lg:p-8 rounded-lg border-2 border-black transform transition-all hover:bg-blue-200 hover:text-white hover:shadow-lg w-full max-w-xs">
                                <div className="flex justify-center items-center mb-3 sm:mb-4">
                                    <div
                                        className="bg-gradient-to-br from-purple-700 to-blue-500 p-3 sm:p-4 rounded-full text-white text-2xl sm:text-3xl"
                                        aria-label={`${category.name} category icon`}
                                    >
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-center text-blue-800">{category.name}</h3>
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>
        </section>
    );
};

export default Categories;
