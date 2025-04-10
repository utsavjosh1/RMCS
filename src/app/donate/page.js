"use client";

import React, { useState } from "react";
import { Heart, ArrowRight, Check, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const donationAmounts = [15, 30, 50, 100];

const Donate = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState(15);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [formStep, setFormStep] = useState(0);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setIsCustom(false);
  };

  const handleCustomAmount = () => {
    setIsCustom(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    setFormStep(0);
  };

  const getCurrentAmount = () => {
    if (isCustom) {
      return customAmount ? parseFloat(customAmount) : 0;
    }
    return selectedAmount;
  };

  const renderFormStep = () => {
    if (formStep === 0) {
      return (
        <div className="space-y-6">
          <h2 className="font-bold text-xl text-gray-800 mb-4">Select Donation Amount</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {donationAmounts.map((amount) => (
              <div
                key={amount}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedAmount === amount && !isCustom
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-purple-300"
                }`}
                onClick={() => handleSelectAmount(amount)}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mr-3">
                    <DollarSign size={16} />
                  </div>
                  <span className="font-medium text-lg">${amount}</span>
                </div>
                <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
                  {selectedAmount === amount && !isCustom && (
                    <Check size={12} className="text-purple-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              isCustom
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 bg-white hover:border-purple-300"
            }`}
            onClick={handleCustomAmount}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 text-white mr-3">
                  <DollarSign size={16} />
                </div>
                <span className="font-medium">Custom Amount</span>
              </div>
              <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
                {isCustom && <Check size={12} className="text-purple-500" />}
              </div>
            </div>

            {isCustom && (
              <div className="mt-3">
                <input
                  type="number"
                  min="1"
                  step="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            onClick={() => setFormStep(1)}
            disabled={isCustom && !customAmount}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            Continue
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border-2 border-purple-200 bg-purple-50">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Donation Summary
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="text-purple-700 font-medium">
                ${getCurrentAmount()}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Thank you for supporting our gaming community. Your contribution helps us build better experiences for everyone.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your name"
                value={paymentDetails.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="your@email.com"
                value={paymentDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition shadow-md"
              >
                Donate ${getCurrentAmount()}
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
      <main className="w-full p-4 md:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-pink-100 text-pink-500 mb-4">
              <Heart size={24} className="animate-pulse-slow" />
            </div>
            <h1 className="text-3xl font-bold text-purple-800 mb-3">
              Support Our Gaming Community
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your one-time donation helps us maintain our servers and develop new features. Every contribution makes a difference!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-violet-200">
            {renderFormStep()}
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-3">
              Where Your Money Goes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl bg-white/70 shadow-sm">
                <div className="text-blue-500 mb-2">🖥️</div>
                <h4 className="font-semibold">Server Costs</h4>
                <p className="text-sm text-gray-600">
                  Keeping our game servers fast and reliable
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 shadow-sm">
                <div className="text-pink-500 mb-2">💻</div>
                <h4 className="font-semibold">Development</h4>
                <p className="text-sm text-gray-600">
                  Building new features and games
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 shadow-sm">
                <div className="text-purple-500 mb-2">🛡️</div>
                <h4 className="font-semibold">Community Safety</h4>
                <p className="text-sm text-gray-600">
                  Moderation tools and support services
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