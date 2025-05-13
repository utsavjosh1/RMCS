import React from "react";
import { Crown, Shield, User, UserCheck } from "lucide-react";

const Rules = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
      <main className="w-full p-4 md:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-purple-100 text-purple-500 mb-4">
              <Crown size={24} />
            </div>
            <h1 className="text-3xl font-bold text-purple-800 mb-3">
              Raja Mantri Chor Sipahi
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A thrilling game of deception and deduction where players take on
              secret roles and use their wits to outsmart each other. Will you
              be the cunning Thief, the wise King, the helpful Minister, or the
              sharp-eyed Policeman?
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-violet-200">
            <div className="space-y-6">
              <section className="p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <h2 className="font-bold text-lg text-gray-800 mb-3">
                  Game Setup
                </h2>
                <ul className="space-y-3">
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Four Roles:</span> Raja
                      (King), Mantri (Minister), Chor (Thief), and Sipahi
                      (Policeman)
                    </div>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Preparation:</span> Each
                      role is written on a chit (small piece of paper), folded,
                      and shuffled
                    </div>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Role Assignment:</span>{" "}
                      Players secretly pick and view their roles
                    </div>
                  </li>
                </ul>
              </section>

              <section className="p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <h2 className="font-bold text-lg text-gray-800 mb-3">
                  Role Objectives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50">
                    <div className="flex items-center mb-2">
                      <Crown className="text-yellow-500 mr-2" size={20} />
                      <h3 className="font-semibold">Raja (King)</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Highest scoring role. Must maintain dignity and authority
                      while observing the game.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50">
                    <div className="flex items-center mb-2">
                      <Shield className="text-blue-500 mr-2" size={20} />
                      <h3 className="font-semibold">Mantri (Minister)</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Second highest scoring role. Can help or mislead the
                      Policeman through clever bluffing.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-red-200 bg-red-50">
                    <div className="flex items-center mb-2">
                      <User className="text-red-500 mr-2" size={20} />
                      <h3 className="font-semibold">Chor (Thief)</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      No base points. Must deceive the Policeman and avoid
                      detection to score points.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-green-200 bg-green-50">
                    <div className="flex items-center mb-2">
                      <UserCheck className="text-green-500 mr-2" size={20} />
                      <h3 className="font-semibold">Sipahi (Policeman)</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Third highest scoring role. Must identify the Thief
                      through observation and deduction.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <h2 className="font-bold text-lg text-gray-800 mb-3">
                  Gameplay Rules
                </h2>
                <ul className="space-y-3">
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Round Structure:</span> The
                      game is played in multiple rounds, with each round
                      focusing on the Policeman&apos;s attempt to identify the Thief
                    </div>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Policeman&apos;s Turn:</span> The
                      Policeman must guess which player is the Thief
                    </div>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Role Switching:</span> If
                      the Policeman guesses incorrectly, they switch places with
                      the Thief
                    </div>
                  </li>
                </ul>
              </section>

              <section className="p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <h2 className="font-bold text-lg text-gray-800 mb-3">
                  Scoring System
                </h2>
                <ul className="space-y-3">
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">King (Raja):</span> Highest
                      points
                    </div>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Minister (Mantri):</span>{" "}
                      Second highest points
                    </div>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Policeman (Sipahi):</span>{" "}
                      Third highest points
                    </div>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <div className="p-1 rounded-full bg-green-100 text-green-500 mr-3 mt-0.5">
                      <Crown size={14} />
                    </div>
                    <div>
                      <span className="font-medium">Thief (Chor):</span> No base
                      points, but can score by avoiding detection
                    </div>
                  </li>
                </ul>
              </section>

              <div className="p-6 rounded-2xl border-2 border-purple-200 bg-purple-50">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  Key Strategies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Bluffing:</span> Use clever
                    deception to mislead other players
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Deduction:</span> Observe
                    player behavior to identify roles
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Luck:</span> Sometimes, a good
                    guess can turn the game around
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rules;
