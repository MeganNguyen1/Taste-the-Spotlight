import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="block text-white mb-2">Get in</span>
              <span className="block bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Have a celebrity recipe suggestion or feedback about StarPlate? We'd love to hear
              from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-red-600 transition-colors">
              <Mail className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400 text-sm">hello@starplate.com</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-red-600 transition-colors">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
              <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-red-600 transition-colors">
              <MapPin className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Location</h3>
              <p className="text-gray-400 text-sm">Los Angeles, CA</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-red-600 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-red-600 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-red-600 transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-red-600 transition-colors resize-none"
                placeholder="Tell us what you think..."
              ></textarea>
            </div>

            {submitted && (
              <div className="bg-green-950 border border-green-800 rounded-lg p-4 text-green-300 text-sm">
                Thanks for reaching out! We'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              className="w-full group relative inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg font-semibold text-white rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-lg transition-all group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-600/50"></div>
              <span className="relative flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </span>
            </button>
          </form>

          <div className="bg-gradient-to-r from-red-950/50 to-amber-950/50 border border-red-900/50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Have a Recipe to Share?</h3>
            <p className="text-gray-300 mb-4">
              Know a celebrity's favorite recipe we should feature? Send us a message and it might
              just make it onto StarPlate!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
