import axios from "axios";

interface SimplifiedError {
  status: number | null;
  message: string;
}

/**
 * Handles errors from Axios requests and returns a simplified error object.
 * @param error The error caught in a try...catch block.
 * @returns A simplified error object with a message and status code.
 */
export const handleAxiosError = (error: unknown): SimplifiedError => {
  console.log(error);
  if (axios.isAxiosError(error)) {
    // Case 1: The server responded with an error status code (4xx or 5xx)
    if (error.response) {
      return {
        status: error.response.status,
        // Assumes the server sends error messages in a `message` property
        message:
          error.response.data.message || `Error: ${error.response.status}`,
      };
    }
    // Case 2: The request was made but no response was received (e.g., network error)
    else if (error.request) {
      return {
        status: null,
        message: "Network error: No response received from server.",
      };
    }
  }
  // Case 3: The error is a standard JavaScript Error instance
  if (error instanceof Error) {
    return {
      status: null,
      message: error.message,
    };
  }

  // Case 3: A non-Axios error or an unexpected issue
  return {
    status: null,
    message: "An unexpected error occurred.",
  };
};
