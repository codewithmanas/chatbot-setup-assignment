import React, { useState } from "react";

// External libraries import
import { Code, Send, Share2, MessageSquare, AlertCircle } from "lucide-react";
import Confetti from "react-confetti";
import toast from "react-hot-toast";

interface Props {
  onComplete?: () => void;
}

// Dummy script for testing
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
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false);


  // Function to copy the script to clipboard
  const handleCopyToClipboard = async () => {

    try {

      await navigator.clipboard.writeText(DUMMY_SCRIPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);


    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error("Failed to copy script to clipboard!");
    }

  }

  // Function to handle email to developer
  const handleEmailToDeveloper = () => {
    window.location.href = "mailto:manas865873@gmail.com";
  };

  //  Handle test completion
  const handleTestComplete = () => {
    setStep("success");
  };

  // Chat Widget Component
  const ChatWidget = () => {
    return (
      <div className="absolute right-12 bottom-12 border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Chat with us</h3>
        <button className="text-gray-400 hover:text-gray-600"
          onClick={() => setShowChatWidget(false)}
        >
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
        onClick={() => setShowFeedback(true)}
        className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
    )
  }


  // Preview component with dummy website and chatbot
  const Preview = () => (
    <div className="fixed inset-0 bg-white z-50">
      {/* Feedback top bar */}
      {showFeedback && (
        <div className="absolute top-0 left-0 right-0 bg-blue-50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-blue-600" />
            <span>Chatbot not working as intended? 
              <span className="underline cursor-pointer" 
              onClick={() => {
                  toast.error("Not implemented yet!");
            }}>
              Share feedback
              </span>
            </span>
          </div>
          <button 
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setShowFeedback(false)}
          >
            Close
          </button>
        </div>
      )}

      <div className="mt-8 relative">
                {/* Dummy website content */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Your Website</h1>
        <p className="text-gray-600">This is a preview of how the chatbot will appear on your website.</p>
      </div>
      
      {/* Chatbot widget */}
      <div className="fixed bottom-4 right-4">
        <button 
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
          // onClick={() => setShowFeedback(true)}
          onClick={() => setShowChatWidget(!showChatWidget)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>

          {showChatWidget && <ChatWidget />}
      </div>
      
      {/* Close preview button */}
      <button
        className={`${showFeedback ? "absolute top-8 right-4" : "fixed top-2 right-4"} p-2 bg-gray-100 rounded-full`}
        onClick={() => setShowPreview(false)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      </div>
      
    </div>
  );


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
              className="w-full px-4 py-2 cursor-pointer rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50"
              onClick={() => setStep("testing")}
            >
              Start talking to your chatbot
            </button>

            <div className="flex flex-col sm:flex-row gap-2 justify-center mt-6">
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
              <button className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50" 
              onClick={() => setStep("success")}>
                Back
              </button>
              <button
              className="sr-only px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
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
            className="w-full justify-between px-4 py-2 rounded-lg font-medium flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-300 disabled:to-blue-400 transform hover:scale-[1.02] active:scale-[0.98]"
            // onClick={() => setStep("testing")}
            onClick={() => setShowPreview(true)}
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

              <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50"
                onClick={handleCopyToClipboard}
              >
                <Code className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy Code'}
              </button>

              <button
                className="px-2 sm:px-4 py-1 sm:py-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 disabled:border-gray-100"
                onClick={handleEmailToDeveloper}
              >
                <Send className="w-4 h-4" />
                Email to Developer
              </button>

              </div>

            </div>

            <button
              className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 disabled:border-gray-100 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 hover:shadow-lg bg-gradient-to-r from-blue-500 to-blue-600  hover:from-blue-600 hover:to-blue-700 disabled:from-blue-300 disabled:to-blue-400 transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleTestComplete}
            >
              <Send className="w-4 h-4" />
              Complete Setup
            </button>
          </div>
        </div>
      </div>


      {/* Preview Modal */}
      {showPreview && <Preview />}
    </div>
  );
};
