import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const API_URL = "https://script.google.com/macros/s/AKfycbwzhQC8NDSxyrVaQQdYCeIms8bR4HoN6R7JOLRpgaf--y_PI4ZzRFQce62SelgIPJQU/exec";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* ------------------ GSAP animation ------------------ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ------------------ FORM SUBMIT ------------------ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);

      await fetch(API_URL, {
        method: "POST",
        body: form,
        mode: "no-cors",
      });

      if (!form) {
        setError("Email is required");
        return;
      }
      setError(null);

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };


  /* ------------------ INPUT CHANGE ------------------ */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "aaryapandey669@gmail.com",
      href: "mailto:aaryapandey669@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 7999822556",
      href: "tel:+917999822556",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Raipur, Chhattisgarh",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="contact-content">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-purple text-sm font-medium tracking-wider uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Work Together
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your ideas
              to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Contact Information
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Feel free to reach out through any of the following channels.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-dark-gray border border-white/5 hover:border-purple/30 transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center text-purple group-hover:bg-purple group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/30">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-sm text-accent-green font-medium">
                  Available for new projects
                </span>
              </div>
            </div>

            {/* Right form */}
            <div className="glass rounded-2xl p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-accent-green" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-dark-bg border-white/10 text-white placeholder:text-gray-500 focus:border-purple focus:ring-purple/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-dark-bg border-white/10 text-white placeholder:text-gray-500 focus:border-purple focus:ring-purple/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-dark-bg border-white/10 text-white placeholder:text-gray-500 focus:border-purple focus:ring-purple/20 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 rounded-full bg-purple hover:bg-purple-dark text-white font-medium transition-all duration-300 hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={18} />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
