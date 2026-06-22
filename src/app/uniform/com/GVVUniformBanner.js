import Image from "next/image";

export default function UniformPage() {
  const features = [
    {
      icon: "🛡️",
      title: "DISCIPLINE",
      subtitle: "BUILDS CHARACTER",
    },
    {
      icon: "👥",
      title: "UNITY",
      subtitle: "BUILDS STRENGTH",
    },
    {
      icon: "⭐",
      title: "PRIDE",
      subtitle: "BUILDS CONFIDENCE",
    },
    {
      icon: "🏅",
      title: "EXCELLENCE",
      subtitle: "BUILDS FUTURE",
    },
  ];

  return (
    <div className="min-h-screen  overflow-hidden 
    ">
      <div className="max-w-[1600px] mx-auto">

        <section className="grid lg:grid-cols-2 min-h-screen">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 text-white">

            <h1 className="text-5xl md:text-7xl font-extrabold leading-none">
              GVV
            </h1>

            <h2 className="text-5xl md:text-7xl font-extrabold text-[#F4C542] leading-none mt-2">
              UNIFORM
            </h2>

            <div className="w-72 h-[3px] bg-[#F4C542] mt-6"></div>

            <h3 className="mt-8 text-xl md:text-3xl font-bold uppercase">
              Dress Code. Discipline. Distinction.
            </h3>

            <p className="mt-6 text-gray-200 text-base md:text-lg leading-8 max-w-xl">
              Our uniform reflects the values of discipline, unity and pride.
              Designed for comfort and elegance, it inspires confidence and a
              sense of belonging among our students.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">

              {features.map((item, index) => (
                <div
                  key={index}
                  className="text-center border-l border-[#F4C542]/30 first:border-none"
                >
                  <div className="text-4xl mb-4">
                    {item.icon}
                  </div>

                  <h4 className="font-bold text-sm">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-300 mt-2">
                    {item.subtitle}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative flex items-center justify-center overflow-hidden">

            {/* OUTER GOLD CURVE */}
            <div className="absolute right-[-220px] w-[950px] h-[950px] rounded-full border-[12px] border-[#F4C542]"></div>

            {/* BLUE CURVE 1 */}
            <div className="absolute right-[-190px] w-[900px] h-[900px] rounded-full border-[14px] border-[#1145c7]"></div>

            {/* BLUE CURVE 2 */}
            <div className="absolute right-[-160px] w-[850px] h-[850px] rounded-full border-[14px] border-[#0b2f97]"></div>

            {/* MAIN IMAGE INSIDE CIRCLE */}
            <div className="relative z-20 w-[780px] h-[780px] rounded-full overflow-hidden">

              <Image
                src="/ghj.png"
                alt="GVV Uniform"
                fill
                priority
                className="object-cover"
              />

            </div>

          </div>

        </section>
      </div>
    </div>
  );
}