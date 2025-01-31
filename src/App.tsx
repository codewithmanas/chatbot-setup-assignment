import { useState } from "react";
import { SetupStep } from "./types";

// Components import
import { UserRegistration } from "./components/steps/UserRegistration";
import { OrganizationSetup } from "./components/steps/OrganizationSetup";
import { ChatbotIntegration } from "./components/steps/ChatbotIntegration";

// External libraries import
import { Toaster } from "react-hot-toast";
import { Bot } from "lucide-react";


// Setup steps
const steps: SetupStep[] = [
  {
    id: 1,
    title: "Account",
    description: "Create your account",
    completed: false,
  },
  {
    id: 2,
    title: "Organization",
    description: "Setup your organization",
    completed: false,
  },
  {
    id: 3,
    title: "Integration",
    description: "Deploy your chatbot",
    completed: false,
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);


  // Handle step completion
  const handleStepComplete = (step: number) => {
    setCompletedSteps((prev) => [...prev, step]);
    setCurrentStep((prev) => prev + 1);
  };


  // Render step based on current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <UserRegistration onComplete={() => handleStepComplete(0)} />;
      case 1:
        return <OrganizationSetup onComplete={() => handleStepComplete(1)} />;
      case 2:
        return <ChatbotIntegration onComplete={() => handleStepComplete(2)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Toaster position="top-right" reverseOrder={false} />

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Bot className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  SetChatBot
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Desktop Step */}

        {/* Mobile Step */}
        <div className="">
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Step {currentStep + 1} of {steps.length}:
            </span>
            <span className="ml-2 text-sm font-medium text-gray-900">
              {steps[currentStep].title}
            </span>
          </div>
        </div>

        {/* Render Component */}
        <div className="mt-8">{renderStep()}</div>
      </main>
    </div>
  );
}

export default App;
