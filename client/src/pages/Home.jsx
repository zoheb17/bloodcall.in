import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Heart, MapPin, Phone, Search, Droplets, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const mock = [
  { id: 1, name: "Zoheb", city: "Akola", group: "AB-", phone: "9022442668" },
  { id: 2, name: "Rahil", city: "Akola", group: "O+", phone: "7666892754" },
  { id: 3, name: "Kasim", city: "Akola", group: "O-", phone: "8087248248" },
  { id: 4, name: "Ayaan", city: "Nagpur", group: "A+", phone: "9876543210" },
  { id: 5, name: "Sameer", city: "Pune", group: "B+", phone: "9123456780" },
];

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {

  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [donors] = useState(mock);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All");

  const filtered = donors.filter((d) => {
    const s =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase());
    const g = group === "All" || d.group === group;
    return s && g;
  });

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 overflow-x-hidden bg-gradient-to-b from-[#fdfcf9] via-[#faf8f5] to-[#fef6f4] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] bg-rose-200/25 dark:bg-rose-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-amber-100/30 dark:bg-amber-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-rose-100/40 dark:bg-rose-900/15 rounded-full blur-3xl" />
      </div>

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm shadow-slate-200/20 dark:shadow-slate-950/50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Heart className="w-5 h-5 text-white fill-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              LifeSaver
            </span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="group flex items-center gap-2 bg-gradient-to-r from-rose-600 to-red-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300"
            >
              Donate Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative text-center pt-16 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100/80 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-sm font-medium mb-6">
            <Droplets className="w-4 h-4" />
            Every drop counts. Every life matters.
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent">
              Find Blood Donors
            </span>
            <br />
            <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              Near You
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Connect instantly with verified donors. Your search could save a life today.
          </p>
        </motion.div>
      </section>

      {/* SEARCH */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-4xl mx-auto px-6 mb-14"
      >
        <div className="relative bg-white dark:bg-slate-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-700/50 p-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              placeholder="Search by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
            />
          </div>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl font-medium text-slate-700 dark:text-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all cursor-pointer"
          >
            {bloodGroups.map((g) => (
              <option key={g} value={g}>
                {g === "All" ? "All blood types" : g}
              </option>
            ))}
          </select>
        </div>
      </motion.section>

      {/* DONOR CARDS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((d) => (
            <motion.div
              key={d.id}
              variants={item}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-white dark:bg-slate-800/80 rounded-2xl p-6 shadow-lg shadow-slate-200/40 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/20 hover:border-rose-100 dark:hover:border-rose-900/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/0 to-rose-50/0 dark:from-rose-900/0 dark:to-rose-900/0 group-hover:from-rose-50/50 dark:group-hover:from-rose-900/20 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white">
                      {d.name}
                    </h3>
                    <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 dark:text-rose-500" />
                      {d.city}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center min-w-[3rem] h-9 px-3 bg-gradient-to-r from-rose-600 to-red-600 text-white text-sm font-bold rounded-xl shadow-md shadow-rose-500/30 group-hover:shadow-lg group-hover:shadow-rose-500/40 transition-shadow">
                    {d.group}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <p className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
                    <Phone className="w-3.5 h-3.5" />
                    {d.phone.slice(0, 4)}******
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
                  >
                    Contact
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-slate-500 dark:text-slate-400"
          >
            <Heart className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <p className="font-medium">No donors found matching your search.</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
