export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold">
          বঙ্গলিপি <span className="text-blue-300">| Bangla Made Simple</span>
        </div>

        {/* Links */}
        <ul className="flex gap-6 mt-4 md:mt-0 text-sm">
          <li>
            <a
              href="/about"
              className="hover:text-blue-300 transition duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/features"
              className="hover:text-blue-300 transition duration-200"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-blue-300 transition duration-200"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <div className="mt-4 md:mt-0 text-sm text-gray-400">
          © {new Date().getFullYear()} BongoLipi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
