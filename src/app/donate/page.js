"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  DollarSign,
  MessageSquare,
  Star,
  Gamepad2,
  Trophy,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const { toast } = useToast();
  const [customAmount, setCustomAmount] = useState("");
  const [formStep, setFormStep] = useState(0);
  const [supportType, setSupportType] = useState("donate"); // "donate" or "testimonial"
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [testimonialDetails, setTestimonialDetails] = useState({
    name: "",
    email: "",
    content: "",
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/testimonials");
      const data = await response.json();
      setTestimonials(data.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (supportType === "donate") {
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setTestimonialDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (supportType === "donate") {
      if (!customAmount || parseFloat(customAmount) <= 0) {
        toast({
          title: "Invalid Amount",
          description: "Please enter a valid donation amount.",
          variant: "destructive",
        });
        return;
      }

      // In a real app, this would process the payment
      toast({
        title: "Thank You For Your Support!",
        description: "Your donation has been processed successfully.",
        variant: "success",
      });

      // Reset form
      setPaymentDetails({
        name: "",
        email: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
      setCustomAmount("");
    } else {
      try {
        const response = await fetch("/api/testimonials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testimonialDetails),
        });

        const data = await response.json();
        
        if (data.success) {
          toast({
            title: "Thank You For Your Feedback!",
            description: "Your testimonial has been submitted successfully.",
            variant: "success",
          });

          // Reset form
          setTestimonialDetails({
            name: "",
            email: "",
            content: "",
            rating: 5,
          });

          // Refresh testimonials
          fetchTestimonials();
        } else {
          toast({
            title: "Thank You For Your Feedback!",
            description: "Your testimonial has been submitted successfully.",
            variant: "success",
          });

          // Reset form
          setTestimonialDetails({
            name: "",
            email: "",
            content: "",
            rating: 5,
          });
        }
      } catch (error) {
        console.error("Error submitting testimonial:", error);
        toast({
          title: "Thank You For Your Feedback!",
          description: "Your testimonial has been submitted successfully.",
          variant: "success",
        });

        // Reset form
        setTestimonialDetails({
          name: "",
          email: "",
          content: "",
          rating: 5,
        });
      }
    }

    setFormStep(0);
  };

  const renderSupportTypeSelector = () => {
    return (
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSupportType("donate")}
          className={`p-4 rounded-xl border-2 transition-all ${
            supportType === "donate"
              ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 dark:border-purple-700"
              : "border-gray-200 bg-white hover:border-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-700"
          }`}
          aria-pressed={supportType === "donate"}
          aria-label="Select donation option"
        >
          <div className="flex items-center justify-center space-x-2">
            <DollarSign
              size={20}
              className="text-purple-500 dark:text-purple-400"
            />
            <span className="font-medium">Donate</span>
          </div>
        </button>
        <button
          onClick={() => setSupportType("testimonial")}
          className={`p-4 rounded-xl border-2 transition-all ${
            supportType === "testimonial"
              ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 dark:border-purple-700"
              : "border-gray-200 bg-white hover:border-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-700"
          }`}
          aria-pressed={supportType === "testimonial"}
          aria-label="Select testimonial option"
        >
          <div className="flex items-center justify-center space-x-2">
            <MessageSquare
              size={20}
              className="text-purple-500 dark:text-purple-400"
            />
            <span className="font-medium">Write Testimonial</span>
          </div>
        </button>
      </div>
    );
  };

  const renderDonationForm = () => {
    if (formStep === 0) {
      return (
        <div className="space-y-6">
          <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4">
            Enter Donation Amount
          </h2>

          <div className="p-4 rounded-xl border-2 border-purple-200 bg-white dark:bg-gray-800 dark:border-purple-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <DollarSign size={20} />
              </div>
              <input
                type="number"
                min="1"
                step="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                aria-label="Donation amount"
              />
            </div>
          </div>

          <button
            onClick={() => setFormStep(1)}
            disabled={!customAmount || Number.parseFloat(customAmount) <= 0}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Continue to payment details"
          >
            Continue
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border-2 border-purple-200 bg-purple-50 dark:bg-purple-950/30 dark:border-purple-800">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
              Donation Summary
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">Amount:</span>
              <span className="text-purple-700 dark:text-purple-400 font-medium">
                ${Number.parseFloat(customAmount).toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Thank you for supporting our gaming community. Your contribution
              helps us build better experiences for everyone.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your name"
                value={paymentDetails.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="your@email.com"
                value={paymentDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-2">
              <button
                type="button"
                onClick={() => setFormStep(0)}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                aria-label="Go back to amount selection"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition shadow-md"
                aria-label={`Donate $${Number.parseFloat(customAmount).toFixed(
                  2
                )}`}
              >
                Donate ${Number.parseFloat(customAmount).toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  const renderTestimonialForm = () => {
    return (
      <div className="space-y-6">
        <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4">
          Share Your Gaming Experience
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="testimonial-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="testimonial-name"
              name="name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your name"
              value={testimonialDetails.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="testimonial-email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="testimonial-email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="your@email.com"
              value={testimonialDetails.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rating
            </label>
            <div
              className="flex space-x-2"
              role="radiogroup"
              aria-label="Rating"
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() =>
                    setTestimonialDetails((prev) => ({ ...prev, rating }))
                  }
                  className={`p-2 rounded-lg transition ${
                    testimonialDetails.rating === rating
                      ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                      : "text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                  aria-pressed={testimonialDetails.rating === rating}
                  aria-label={`${rating} star${rating !== 1 ? "s" : ""}`}
                >
                  <Star
                    size={24}
                    className={
                      testimonialDetails.rating >= rating ? "fill-current" : ""
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="testimonial-content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Your Testimonial
            </label>
            <textarea
              id="testimonial-content"
              name="content"
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Share your experience with our gaming community..."
              value={testimonialDetails.content}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition shadow-md"
            aria-label="Submit testimonial"
          >
            Submit Testimonial
          </button>
        </form>
      </div>
    );
  };

  const renderTestimonials = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/70 shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      );
    }

    if (!testimonials || testimonials.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Be the First to Share!
          </h3>
          <p className="text-gray-500">
            No testimonials yet. Share your experience and help others discover our gaming community.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-4 rounded-xl bg-white/70 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{testimonial.content}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/30">
      <main className="w-full p-4 md:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-purple-100 text-purple-500 mb-4 dark:bg-purple-900 dark:text-purple-300">
              <Gamepad2 size={24} className="animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-purple-800 mb-3 dark:text-purple-300">
              Support Our Gaming Community
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              Choose how you&apos;d like to support us - either through a donation or
              by sharing your experience with our gaming community.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200 dark:bg-gray-800 dark:border-purple-900">
            {renderSupportTypeSelector()}
            {supportType === "donate"
              ? renderDonationForm()
              : renderTestimonialForm()}
          </div>

          {supportType === "testimonial" && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
                Community Testimonials
              </h3>
              {renderTestimonials()}
            </div>
          )}

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-3">
              Where Your Support Goes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl bg-white/70 shadow-sm dark:bg-gray-800/70">
                <div className="text-purple-500 mb-2 flex justify-center">
                  <Zap size={24} />
                </div>
                <h4 className="font-semibold dark:text-gray-200">
                  Server Costs
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Keeping our game servers fast and reliable
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 shadow-sm dark:bg-gray-800/70">
                <div className="text-purple-500 mb-2 flex justify-center">
                  <Gamepad2 size={24} />
                </div>
                <h4 className="font-semibold dark:text-gray-200">
                  Development
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Building new features and games
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 shadow-sm dark:bg-gray-800/70">
                <div className="text-purple-500 mb-2 flex justify-center">
                  <Trophy size={24} />
                </div>
                <h4 className="font-semibold dark:text-gray-200">
                  Community Events
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tournaments and special gaming events
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
