import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Phone,
  Search,
  ArrowRight,
  Sun,
  Moon,
  Loader2,
  LogOut,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

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

export default function Dashboard() {
  const url = import.meta.env.VITE_URL
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const [donors, setDonors] = useState([]);
  const [group, setGroup] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ show like → 📞 +91 99***
  const maskPhone = (phone = "") =>
    `+91 ${(phone.toString().slice(0, 2) || "00")}***`;

  // ================= Logout =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    setDonors([]);
    navigate("/", { replace: true });
  };

  // ================= Fetch donors =================
  const fetchDonors = async (bloodGroup) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) return;

      if (bloodGroup === "All") {
        // Default: get all donors
        const res = await axios.get(
          `${url}/private/getalldonors`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setDonors(res.data || []);
      } else {
        // Filter by blood group
        const res = await axios.post(
          `${url}/private/blood-request`,
          { bloodGroup },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setDonors(res.data || []);
      }
    } catch (err) {
      setDonors([]);
      setError(
        err.response?.data?.msg ||
        (group === "All" ? "No donors found." : "No donors found for this group in your city.")
      );
    } finally {
      setLoading(false);
    }
  };

  // fetch when blood group changes
  useEffect(() => {
    fetchDonors(group);
  }, [group]);

  // ================= Filter =================
  const filtered = donors.filter((d) => {
    const name = (d.userName || "").toLowerCase();
    const city = (d.city || "").toLowerCase();
    const term = search.toLowerCase();

    return name.includes(term) || city.includes(term);
  });

  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 overflow-x-hidden bg-linear-to-b from-[#fdfcf9] via-[#faf8f5] to-[#fef6f4] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-md h-112 bg-rose-200/25 dark:bg-rose-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-amber-100/30 dark:bg-amber-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-rose-100/40 dark:bg-rose-900/15 rounded-full blur-2xl" />
      </div>

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm shadow-slate-200/20 dark:shadow-slate-950/50"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Heart className="w-5 h-5 text-white fill-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              LifeSaver
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
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
              onClick={() => navigate("/donor-register")}
              className="group flex items-center gap-2 bg-linear-to-r from-rose-600 to-red-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300"
            >
              Donate Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            {token && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center gap-2 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-full font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-4">
            Donor Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Find donors
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Search and connect with blood donors in your area
          </p>
        </motion.div>
      </section>

      {/* SEARCH */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative bg-white dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-700/50 p-4 flex flex-col sm:flex-row gap-4 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-rose-500 via-red-500 to-rose-600" />
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              placeholder="Search donor or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
            />
          </div>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 rounded-xl font-medium text-slate-700 dark:text-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all cursor-pointer"
          >
            {bloodGroups.map((g) => (
              <option key={g} value={g}>
                {g === "All" ? "All blood types" : g}
              </option>
            ))}
          </select>
        </motion.div>
      </section>

      {/* DONORS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 py-20 text-slate-500 dark:text-slate-400"
          >
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="font-medium">Loading donors...</span>
          </motion.div>
        )}

        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-6 py-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl text-amber-800 dark:text-amber-200"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-slate-500 dark:text-slate-400"
          >
            <Heart className="w-14 h-14 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <p className="font-medium text-lg">
              {search ? "No donors match your search" : "No donors found"}
            </p>
            <p className="text-sm mt-2">
              {search ? "Try a different search term" : "Check back later or try another blood type"}
            </p>
          </motion.div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((d) => (
              <motion.div
                key={d._id}
                variants={item}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-slate-200/40 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/20 hover:border-rose-100 dark:hover:border-rose-900/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-rose-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-linear-to-br from-rose-50/0 to-rose-50/0 dark:from-rose-900/0 dark:to-rose-900/0 group-hover:from-rose-50/50 dark:group-hover:from-rose-900/20 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white">
                        {d.userName || "Unknown"}
                      </h3>
                      <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 dark:text-rose-500" />
                        {d.city || "Unknown city"}
                      </p>
                    </div>
                    <span className="inline-flex items-center justify-center min-w-12 h-9 px-3 bg-linear-to-r from-rose-600 to-red-600 text-white text-sm font-bold rounded-xl shadow-md shadow-rose-500/30 group-hover:shadow-lg group-hover:shadow-rose-500/40 transition-shadow">
                      {d.bloodGroup}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <p className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
                      <Phone className="w-3.5 h-3.5" />
                      {maskPhone(d.phone)}
                    </p>
                    <a
                      href={`tel:+91${d.userPhone}`}
                      className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
                    >
                      Contact
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
