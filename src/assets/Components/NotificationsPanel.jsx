import React from "react";

// Houses the email test-mode toggles, previously shown as banners pinned to
// the top of every tab in the admin panel. Living in their own tab now so
// they don't compete for attention with whatever the owner actually came
// here to do.
const NotificationsPanel = ({
  testModeStatus,
  togglingTestMode,
  onToggleTestMode,
  customerTestModeStatus,
  togglingCustomerTestMode,
  onToggleCustomerTestMode,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-300 mb-1">Notifications</h2>
      <p className="text-sm text-gray-500 mb-6">
        Safety switches for where booking emails actually go. Leave both OFF in normal operation.
      </p>

      <div className="space-y-4 max-w-2xl">
        {testModeStatus && (
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 rounded-xl border text-sm ${
              testModeStatus.testMode
                ? "bg-yellow-900/40 border-yellow-700 text-yellow-200"
                : "bg-green-900/30 border-green-700 text-green-300"
            }`}
          >
            <div>
              <p className="font-semibold mb-0.5">Reminder &amp; branch emails</p>
              <p>
                {testModeStatus.testMode
                  ? `TEST MODE — redirecting to ${testModeStatus.testEmail || "(no test email set)"}`
                  : "LIVE — sending to real customers and branches"}
              </p>
            </div>
            <button
              onClick={onToggleTestMode}
              disabled={togglingTestMode}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition disabled:opacity-50 shrink-0 ${
                testModeStatus.testMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-yellow-600 hover:bg-yellow-700 text-white"
              }`}
            >
              {togglingTestMode ? "Updating..." : testModeStatus.testMode ? "Turn test mode OFF" : "Turn test mode ON"}
            </button>
          </div>
        )}

        {customerTestModeStatus && (
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 rounded-xl border text-sm ${
              customerTestModeStatus.testMode
                ? "bg-yellow-900/40 border-yellow-700 text-yellow-200"
                : "bg-green-900/30 border-green-700 text-green-300"
            }`}
          >
            <div>
              <p className="font-semibold mb-0.5">Customer-facing emails</p>
              <p>
                {customerTestModeStatus.testMode
                  ? `TEST MODE — redirecting to ${customerTestModeStatus.testEmail || "(no test email set)"}`
                  : "LIVE — sending to real customers"}
              </p>
            </div>
            <button
              onClick={onToggleCustomerTestMode}
              disabled={togglingCustomerTestMode}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition disabled:opacity-50 shrink-0 ${
                customerTestModeStatus.testMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-yellow-600 hover:bg-yellow-700 text-white"
              }`}
            >
              {togglingCustomerTestMode
                ? "Updating..."
                : customerTestModeStatus.testMode
                ? "Turn test mode OFF"
                : "Turn test mode ON"}
            </button>
          </div>
        )}

        {!testModeStatus && !customerTestModeStatus && (
          <p className="text-gray-500 text-sm">Loading notification settings...</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
