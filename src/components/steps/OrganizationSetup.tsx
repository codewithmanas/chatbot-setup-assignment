import React, { useState } from "react";
import { Globe, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { Organization, WebPage } from "../../types";

interface Props {
  onComplete: () => void;
}

const dummyPages: WebPage[] = [
  {
    url: "/about",
    status: "scraped",
    chunks: [
      "Company overview and mission statement",
      "Team information and leadership",
      "Company values and culture",
    ],
  },
  {
    url: "/products",
    status: "pending",
    chunks: [],
  },
  {
    url: "/contact",
    status: "detected",
    chunks: [],
  },
];

export const OrganizationSetup: React.FC<Props> = ({ onComplete }) => {
  const [org, setOrg] = useState<Organization>({
    name: "",
    website: "",
    description: "",
  });
  const [isScanning, setIsScanning] = useState(false);
  const [pages, setPages] = useState<WebPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<WebPage | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);

    // TODO: Simulate website scanning
    setTimeout(() => {
      setPages(dummyPages);
      setIsScanning(false);
    }, 3000);
  };

  const getStatusColor = (status: WebPage["status"]) => {
    switch (status) {
      case "scraped":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "detected":
        return "text-blue-600 bg-blue-50";
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Setup your organization
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border-gray-300"
            type="text"
            required
            value={org.name}
            onChange={(e) => setOrg({ ...org, name: e.target.value })}
            placeholder="Enter your company name"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border-gray-300"
            type="url"
            required
            value={org.website}
            onChange={(e) => setOrg({ ...org, website: e.target.value })}
            placeholder="Enter your website url"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Company Description
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border-gray-300"
            type="textarea"
            required
            value={org.description}
            onChange={(e) => setOrg({ ...org, description: e.target.value })}
            placeholder="Tell us about your company..."
          />
        </div>

        {!pages.length ? (
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isScanning ? "Scanning website..." : "Scan Website"}
            <Globe className="w-4 h-4" />
          </button>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Detected Pages
            </h3>
            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.url}
                  className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                  onClick={() => setSelectedPage(page)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{page.url}</span>
                    <span
                      className={clsx(
                        "px-2 py-1 rounded-full text-sm",
                        getStatusColor(page.status)
                      )}
                    >
                      {page.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedPage && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2">
                  Content from {selectedPage.url}
                </h4>
                {selectedPage.chunks.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedPage.chunks.map((chunk, i) => (
                      <li key={i} className="p-2 bg-white rounded border">
                        {chunk}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No content available yet.</p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={onComplete}
              className="mt-4 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              Continue to Integration
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
