import React, { useState } from "react";
import { Code, Send, Share2, MessageSquare } from "lucide-react";
import Confetti from "react-confetti";

interface Props {
  onComplete: () => void;
}

const DUMMY_SCRIPT = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.beyondchats.com/chatbot.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','chatLayer','BC-XXXXX');
</script>`;

export const ChatbotIntegration: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<"options" | "testing" | "success">(
    "options"
  );
  const [isTestingOpen, setIsTestingOpen] = useState(false);

  const handleTestComplete = () => {
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />

        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Congratulations! 🎉
          </h2>

          <p className="text-gray-600 mb-8">
            Your chatbot is now successfully integrated and ready to help your
            customers!
          </p>

          <div className="space-y-4">
            <button
              className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
              onClick={() => {
                /* Implement admin panel navigation */
              }}
            >
              Explore Admin Panel
            </button>

            <button
              className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50"
              onClick={() => {
                /* Implement chatbot testing */
              }}
            >
              Start talking to your chatbot
            </button>

            <div className="flex gap-2 justify-center mt-6">
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 disabled:border-gray-100"
                onClick={() => {
                  /* Implement sharing */
                }}
              >
                <Share2 className="w-4 h-4" />
                Share on Twitter
              </button>

              <button
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 disabled:border-gray-100"
                onClick={() => {
                  /* Implement sharing */
                }}
              >
                <Share2 className="w-4 h-4" />
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "testing") {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Testing Your Chatbot
          </h2>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">example.com</span>
                <button
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 disabled:border-gray-100"
                  onClick={() => setIsTestingOpen(!isTestingOpen)}
                >
                  {isTestingOpen ? "Close Chat" : "Open Chat"}
                </button>
              </div>

              {isTestingOpen && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Chat with us</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Close chat</span>×
                    </button>
                  </div>
                  <div className="h-64 overflow-y-auto mb-4 space-y-4">
                    <div className="flex gap-2">
                      <div className="bg-blue-100 rounded-lg p-3">
                        <p className="text-sm">
                          Hello! How can I help you today?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Type your message..."
                    />
                    <button
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50" onClick={() => setStep("options")}>
                Back
              </button>
              <button
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
               onClick={handleTestComplete}>Complete Setup</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Integrate Your Chatbot
        </h2>

        <div className="space-y-6">
          <button
            className="w-full justify-between px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
            onClick={() => setStep("testing")}
          >
            Test Chatbot
            <MessageSquare className="w-4 h-4" />
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or integrate now
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Add to your website</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{DUMMY_SCRIPT}</code>
                </pre>
              </div>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50"
                onClick={() => {
                  /* Implement copy */
                }}
              >
                <Code className="w-4 h-4" />
                Copy Code
              </button>
            </div>

            <button
              className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 disabled:border-gray-100"
              onClick={() => {
                /* Implement email */
              }}
            >
              <Send className="w-4 h-4" />
              Email to Developer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
