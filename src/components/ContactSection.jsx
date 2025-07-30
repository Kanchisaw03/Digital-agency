import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section className="py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
      {/* Left: Logo/Graphic */}
      <div className="flex-1 flex flex-col items-center justify-center mb-8 md:mb-0">
        <div className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
          <img src="/test-logo.png" alt="Let's Talk" className="w-full h-full object-contain rounded-full shadow-neumorph" />
        </div>
        <h2 className="mt-6 text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary-blue via-primary-green to-yellow-400 bg-clip-text text-transparent">Let's Connect Over Coffee</h2>
        <p className="mt-2 text-base text-gray-300 text-center hidden md:block">Let's Talk</p>
      </div>
      {/* Right: Form */}
      <div className="flex-1 w-full max-w-lg mx-auto">
        <ContactForm />
      </div>
    </section>
  );
} 