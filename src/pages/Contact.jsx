import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-dark py-10 px-2">
      <div className="max-w-5xl w-full bg-dark rounded-2xl shadow-xl mx-auto flex flex-col md:flex-row items-center gap-10 p-6 md:p-12">
        {/* Left: Logo/Graphic */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8 md:mb-0">
          <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            <img src="/test-logo.png" alt="Let's Talk" className="w-full h-full object-contain rounded-full shadow-neumorph" />
          </div>
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary-blue via-primary-green to-yellow-400 bg-clip-text text-transparent">Let's Connect Over Coffee</h2>
          <p className="mt-2 text-lg text-gray-300 text-center hidden md:block">Let's Talk</p>
        </div>
        {/* Right: Form */}
        <div className="flex-1 w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 