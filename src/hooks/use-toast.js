"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  AlertTriangle,
  Info,
  X,
  Award,
  CheckCircle2,
} from "lucide-react";

// Toast context
const ToastContext = createContext({});

// Toast variants
const VARIANTS = {
  default: {
    icon: <Info className="h-5 w-5 text-blue-500" />,
    className: "bg-white border-blue-500 text-blue-800",
  },
  success: {
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    className: "bg-white border-green-500 text-green-800",
  },
  destructive: {
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    className: "bg-white border-red-500 text-red-800",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    className: "bg-white border-amber-500 text-amber-800",
  },
  achievement: {
    icon: <Award className="h-5 w-5 text-purple-500" />,
    className: "bg-white border-purple-500 text-purple-800",
  },
  reward: {
    icon: <Star className="h-5 w-5 text-yellow-500" />,
    className: "bg-white border-yellow-500 text-yellow-800",
  },
};

// Toast animations
const ANIMATIONS = {
  bounce: {
    initial: { scale: 0, y: -100, opacity: 0 },
    animate: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  },
  slide: {
    initial: { x: 300, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { x: 300, opacity: 0, transition: { duration: 0.3 } },
  },
  pop: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: [0, 1.1, 1], opacity: 1, transition: { duration: 0.4 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
  },
  shake: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      x: [0, -10, 10, -10, 10, -5, 5, -2, 2, 0],
      transition: { duration: 0.6 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  spin: {
    initial: { rotate: 180, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { rotate: -180, scale: 0, opacity: 0, transition: { duration: 0.3 } },
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(
    ({
      title,
      description,
      variant = "default",
      duration = 5000,
      animation = "bounce",
    }) => {
      const id = Date.now();

      setToasts((prevToasts) => [
        ...prevToasts,
        {
          id,
          title,
          description,
          variant,
          animation,
        },
      ]);

      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, duration);

      return id;
    },
    []
  );

  const dismiss = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-md">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              {...ANIMATIONS[toast.animation]}
              className={`${
                VARIANTS[toast.variant].className
              } rounded-lg border-2 shadow-lg p-4 flex items-start gap-3`}
            >
              <div className="flex-shrink-0 pt-0.5">
                {VARIANTS[toast.variant].icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight">
                  {toast.title}
                </h3>
                {toast.description && (
                  <p className="mt-1 text-sm">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="flex-shrink-0 rounded-full p-1 hover:bg-gray-200/50"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
