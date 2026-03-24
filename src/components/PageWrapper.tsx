import heroImage from "@/assets/hero-image.jpg";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
};

export default PageWrapper;