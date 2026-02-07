import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import {
  Heart,
  Droplets,
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function DonorRegister() {
  const url = import.meta.env.VITE_URL

  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    bloodGroup: "",
    age: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updated = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    setForm(updated);

    if (name === "age") {
      const age = Number(value);
      if (age < 18 || age > 45) {
        setError("Age must be between 18 and 45 years");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = Number(form.age);

    if (age < 18 || age > 45) {
      setError("Age must be between 18 and 45 years");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${url}/private/donor-form`,
        form,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-900 dark:text-slate-100 bg-gradient-to-b from-[#fdfcf9] via-[#faf8f5] to-[#fef6f4] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Decorative blurs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] bg-rose-200/25 dark:bg-rose-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-amber-100/30 dark:bg-amber-900/10 rounded-full blur-3xl" />
      </div>

      {/* Theme toggle */}
      <motion.button
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-center px-12 xl:px-20 py-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 mb-16 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-xl shadow-rose-500/30">
                <Heart className="w-7 h-7 text-white fill-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                LifeSaver
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-6">
              Become a donor.
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                Save lives.
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md leading-relaxed mb-12">
              Register as a blood donor and help someone in need. Your donation
              could save up to 3 lives. Eligible age: 18–45 years.
            </p>
            <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-rose-400" />
                <span className="text-sm font-medium">One donation, 3 lives</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <span className="text-sm font-medium">Be a hero</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right panel - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >
            {/* Mobile header */}
            <div className="lg:hidden flex flex-col items-center mb-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                  LifeSaver
                </span>
              </div>
            </div>

            {/* Form card */}
            <div className="relative bg-white dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600" />

              <div className="p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Become a Donor
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Eligible age: 18–45 years
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Blood group */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Blood group
                    </label>
                    <select
                      name="bloodGroup"
                      required
                      value={form.bloodGroup}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 outline-none transition-all cursor-pointer"
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      min="18"
                      max="45"
                      value={form.age}
                      onChange={handleChange}
                      required
                      placeholder="18-45"
                      className={`w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-2 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all ${
                        error
                          ? "border-red-500 dark:border-red-600 ring-4 ring-red-500/20"
                          : "border-slate-200 dark:border-slate-600 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15"
                      }`}
                    />
                    {error && (
                      <p className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>

                  <Input
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    // placeholder="10-digit mobile number"
                    icon={Phone}
                    required
                  />

                  <Input
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    // placeholder="e.g. Mumbai, Delhi"
                    icon={MapPin}
                    required
                  />

                  <motion.button
                    type="submit"
                    disabled={loading || !!error}
                    whileHover={!loading && !error ? { scale: 1.01 } : {}}
                    whileTap={!loading && !error ? { scale: 0.99 } : {}}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-red-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        Register as Donor
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, type = "text", value, onChange, placeholder, icon: Icon, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full py-3.5 bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 outline-none transition-all ${
            Icon ? "pl-12 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
