"use client";
import { useState } from "react";

const ApiTestingClient = () => {
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [headers, setHeaders] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [statusCode, setStatusCode] = useState<string>("-");
  const [responseBody, setResponseBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendRequest = async () => {
    try {
      setIsLoading(true);
      const headersObj = headers ? JSON.parse(headers) : {};
      const bodyObj = body ? JSON.parse(body) : {};

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...headersObj,
        },
        body: method !== "GET" ? JSON.stringify(bodyObj) : null,
      });

      const data = await response.json();
      setStatusCode(response.status.toString());
      setResponseBody(JSON.stringify(data, null, 2));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setStatusCode("Error");
      setResponseBody("Failed to fetch the data.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-3xl font-bold text-center mb-6">
        API Testing Client
      </h1>

      <div className="bg-orange-500 p-6 rounded-md shadow-md space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="block font-medium">
            API URL
          </label>
          <input
            type="text"
            id="url"
            className="w-full p-2 border border-gray-300 rounded placeholder:text-black bg-gray-700"
            placeholder="Enter API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="method" className="block font-medium">
            HTTP Method
          </label>
          <select
            id="method"
            className="w-full p-2 border border-gray-300 rounded placeholder:text-black bg-gray-700"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="headers" className="block font-medium">
            Headers (JSON Format)
          </label>
          <textarea
            id="headers"
            className="w-full p-2 border border-gray-300 rounded placeholder:text-black bg-gray-700"
            placeholder='{"Authorization": "Bearer your_token"}'
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="body" className="block font-medium">
            Request Body (JSON)
          </label>
          <textarea
            id="body"
            className="w-full p-2 border border-gray-300 rounded placeholder:text-black bg-gray-700"
            placeholder='{"key": "value"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleSendRequest}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            {isLoading ? "Please Waiting..." : "Send Request"}
          </button>
        </div>
      </div>

      <div className="bg-green-500 p-6 mt-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Response</h2>
        <p className="text-lg">
          Status: <span className="font-bold">{statusCode}</span>
        </p>
        <p className="mt-2">Response Body:</p>
        <div className="overflow-auto max-h-full w-full">
          {responseBody && (
            <p
              className="bg-gray-800 p-4 w-max rounded-lg"
              onClick={() => navigator.clipboard.writeText(responseBody)}
            >
              Copy Response
            </p>
          )}
          <pre className="bg-gray-800 text-white p-4 rounded-md mt-2 w-max">
            {responseBody}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiTestingClient;
