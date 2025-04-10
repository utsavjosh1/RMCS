import React from 'react';

const Rules = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
      <main className="w-full p-4 md:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-purple-100 text-purple-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path>
                <circle cx="17" cy="7" r="5"></circle>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-purple-800 mb-3">
              Community Rules
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our rules are designed to foster a positive, respectful, and inclusive gaming environment for all members. Please follow these guidelines to ensure our community remains a fun place for everyone.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-violet-200">
            <div className="space-y-6">
              <section className="p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <h2 className="font-bold text-lg text-gray-800 mb-3">General Guidelines</h2>
                <ul className="space-y-1">
                  {[
                    "Be respectful to all community members.",
                    "No harassment, hate speech, or bullying of any kind.",
                    "Keep discussions civil and constructive.",
                    "No spamming or excessive self-promotion.",
                    "Respect the privacy of others."
                  ].map((rule, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <h2 className="font-bold text-lg text-gray-800 mb-3">Content Rules</h2>
                <ul className="space-y-1">
                  {[
                    "No explicit, illegal, or harmful content.",
                    "Do not post copyrighted material without permission.",
                    "Tag sensitive content appropriately with content warnings.",
                    "Keep posts relevant to the community topic.",
                    "Fact-check information before sharing when possible."
                  ].map((rule, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <h2 className="font-bold text-lg text-gray-800 mb-3">Moderation</h2>
                <ul className="space-y-1">
                  {[
                    "Moderators have final say in all community decisions.",
                    "Rule violations may result in content removal or temporary bans.",
                    "Repeated violations may lead to permanent removal from the community.",
                    "If you notice a rule violation, please report it rather than engaging directly.",
                    "Appeals can be submitted through the Contact page."
                  ].map((rule, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <h2 className="font-bold text-lg text-gray-800 mb-3">Account Rules</h2>
                <ul className="space-y-1">
                  {[
                    "One account per person.",
                    "Do not share your account credentials with others.",
                    "Account names and profile pictures must follow content guidelines.",
                    "Users are responsible for all activity on their accounts."
                  ].map((rule, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="p-6 rounded-2xl border-2 border-purple-200 bg-purple-50">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Note:</h3>
                <div className="text-sm text-gray-600">
                  These rules are subject to change. Members will be notified of significant updates. By participating in our gaming community, you agree to follow these rules.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-3">
              Join Our Community
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl bg-white/70 shadow-sm">
                <div className="text-blue-500 mb-2">🎮</div>
                <h4 className="font-semibold">Play Together</h4>
                <p className="text-sm text-gray-600">
                  Join matches with friendly players
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 shadow-sm">
                <div className="text-pink-500 mb-2">💬</div>
                <h4 className="font-semibold">Safe Environment</h4>
                <p className="text-sm text-gray-600">
                  Enjoy games without toxicity
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 shadow-sm">
                <div className="text-purple-500 mb-2">🏆</div>
                <h4 className="font-semibold">Community Events</h4>
                <p className="text-sm text-gray-600">
                  Participate in tournaments and contests
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rules;